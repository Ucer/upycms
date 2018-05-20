'use strict';


angular.module('WPGCMS', [
        'ui.router',
        'wpg.config',
        'wpg.core',
        'wpg.bench'
    ])

    .constant('angularMomentConfig', {
        timezone: 'zh-cn' // optional
    })

  //     .config(['ChartJsProvider', function (ChartJsProvider) {
  //   // Configure all charts
  //   ChartJsProvider.setOptions({
  //     chartColors: ['#FF5252', '#FF8A80'],
  //     responsive: false
  //   });
  //   // Configure all line charts
  //   ChartJsProvider.setOptions('line', {
  //     showLines: false
  //   });
  // }])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $modalProvider, $datepickerProvider) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(false);

        $modalProvider.defaults.container = "body";
        $modalProvider.defaults.backdrop = "static";
        $modalProvider.defaults.placement = "center";
        $modalProvider.defaults.animation = "fade_3d";

        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            autoclose: true,
            dateType: "string"
        });

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; //当前最好的

        $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

        $httpProvider.interceptors.push("httpInterceptor");

        $httpProvider.defaults.transformRequest = function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            // fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[name + "[]"] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        };



    })

    .factory("httpInterceptor", ["$q", "$location", "$window", "$rootScope", "wpgNotify", function($q, $location, $window, $rootScope, wpgNotify) {
        return {
            'request': function(config) {
                if (angular.isObject(config)){
                    if (!angular.isObject(config.data)) config.data = {};
                    config.data._token = window.WPGAdminConf.token;
                }
                $rootScope.HTTP_STATUS = "request_success";
                $rootScope.HTTP_LOADING = true;
                return config;
            },
            'requestError': function(rejection) {
                $rootScope.HTTP_STATUS = "request_error";
                $rootScope.HTTP_LOADING = false;
                wpgNotify.danger("出现未知错误，请稍后再试！");
                return rejection;
            },
            'response': function(response) {
                if (response.status == 200) {
                    var data = response.data;
                    $rootScope.HTTP_STATUS = "response_success";
                    if (angular.isDefined(response.success) && !response.success) { //success为false
                        $rootScope.HTTP_STATUS = "response_error";
                    }

                    if (angular.isDefined(response.code) && response.code != 200) { //code不等于200
                        $rootScope.HTTP_STATUS = "response_error";
                    }

                    if (angular.isDefined(response.code) && response.code == 401) { //code为401，需登录
                        wpgNotify.danger("用户未登录或已注销！");
                        delete $window.sessionStorage["prevRequestTime"];
                        setTimeout(function() {
                            $window.location.href = "/admin/login/?next=/admin/#" + $location.path();
                        }, 500);
                    }

                    if (angular.isDefined(response.code) && response.code == 400) { //code为400
                        wpgNotify.danger(response.msg);
                    }

                    if (angular.isDefined(data.code) && data.code == 403) { //code为403,无权限
                        wpgNotify.danger(data.msg);
                    }
                } else {
                    $rootScope.HTTP_STATUS = "response_error";
                }

                // if (angular.isDefined(response.token)){
                //     window.WPGAdminConf.token = response.token;
                // }
                $rootScope.HTTP_LOADING = false;
                return response;
            },

            'responseError': function(response) {
                $rootScope.HTTP_STATUS = "response_error";
                // if (angular.isDefined(response.token)){
                //     window.WPGAdminConf.token = response.token;
                // }
                if (response.status == 401 || (angular.isDefined(response.code) && response.code == 401)) { //状态或code为401，需登录
                    wpgNotify.danger("用户未登录或已注销！");
                    delete $window.sessionStorage["prevRequestTime"];
                    setTimeout(function() {
                        $window.location.href = "/admin/login/?next=/admin/#" + $location.path();
                    }, 500);
                    // $rootScope.$broadcast('event: loginRequired');
                } else {
                    wpgNotify.danger("出现未知错误，请稍后再试！");
                }
                $rootScope.HTTP_LOADING = false;
                return $q.reject(response);
            }

        };
    }])

    .run(function($rootScope, $window, $location, $timeout, $state, $http, wpgNotify) {
        var distUrl = window.WPGAdminConf.distUrl;
        $rootScope.siteInfo = { 
            name: 'WPGCMS',
            url: window.WPGAdminConf.siteUrl
        };
        $rootScope.pageTitle = "WPGCMS - 管理后台";
        $rootScope.templateUrl = {
            header: window.WPGAdminConf.distWpgTpl + 'layout/header.tpl.html'
        };
        $rootScope.version = window.WPGAdminConf.version;
        $rootScope.menuList = [];

        //初始化数据
        var initWPGAdmin = function(){
            $http.post(window.WPGAdminConf.initUrl).success(function(resp) {
                if (resp.code == 200) {
                    var data = resp.data;
                    $rootScope.navList = data.navlist;
                    $rootScope.account = data.account;
                    window.WPGAdminConf.distUrl = distUrl = data.urlconf;
                    window.WPGAdminConf.imgThumb = data.imgthumb;
                    window.WPGAdminConf.appTypeData = data.apptypes;
                    $rootScope.initDone = true;
                }else{
                    wpgNotify.danger(resp.msg);
                }
            }).error(function(){
                wpgNotify.danger("出现未知错误，请稍后再试！");
            })
        }
        initWPGAdmin();

        //监控路由变化
        $rootScope.routeChanging = false;
        var gotoState = null, gotoStateParams = null;
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            $rootScope.routeChanging = true;
            $rootScope.initing = true;
            if (!$rootScope.initDone){
                gotoState = toState;
                gotoStateParams = toStateParams;
                event.preventDefault();//取消默认跳转行为
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
            $rootScope.routeChanging = false;
        });


        $rootScope.$watch('siteInfo.name', function(value) {
            if (angular.isDefined(value)) {
                $rootScope.pageTitle = value + " - 管理后台";
            }
        })

        $rootScope.$watch("menuData.length", function(value) {
            if (angular.isDefined(window.WPGAdminConf.appData) && angular.isArray($rootScope.menuList)) {
                var data = {};
                angular.forEach($rootScope.menuData, function(menu) {
                    data[menu.code] = menu.type;
                })
                window.WPGAdminConf.appData = angular.extend({}, window.WPGAdminConf.appData, data);
            }
        })

        //打开、关闭页面窗口
        var bodyElement = angular.element($window.document.body),
            pageLoading = bodyElement.find("#page-loading-wrapper");
        var openPageWindow = function(){
            pageLoading.find("i").hide();
            pageLoading.addClass('out');
        }

        var closePageWindow = function(){
            pageLoading.addClass('in');
            $timeout(function() {
                pageLoading.find("i.icon-locked").show();
            }, 1000);
        }

        //退出后台
        $rootScope.js_user_logout = function() {
            $rootScope.title = "正在退出 - WPGCMS"
            $http.post(distUrl.logout).success(function(response) {
                if (response.code == 200) {
                    closePageWindow();
                    $timeout(function() {
                        $window.location.href = response.data;
                    }, 1200)
                } else {
                    Notify.danger(response.msg);
                }
            }).error(function() {
                $window.location.href = distUrl.logout;
            })
        }

        //初始化成功后执行
        $rootScope.$watch('initDone', function(value) {
            openPageWindow();
            //跳转URL
            if (value === true && gotoState && angular.isDefined($state.go)) {
                $state.go(gotoState.name, gotoStateParams);
            }
        });

    });
'use strict';

/**
 * 定义应用的路由
 */

angular.module('wpg.config', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        var distTpl = window.WPGAdminConf.distTpl + '/wpg/';

        // $stateProvider
        // .state('wpg_demo_index', {
        //     url: '/demo',
        //     templateUrl: distTpl + 'demo/index.tpl.html',
        //     controller: WpgDemoController
        // })
        // .state('wpg_demo_edit', {
        //     url: '/demo/edit',
        //     templateUrl: distTpl + 'demo/edit.tpl.html',
        //     controller: WpgDemoEditController
        // })
        // .state('wpg_demo_category', {
        //     url: '/demo/category',
        //     templateUrl: distTpl + 'demo/category.tpl.html',
        //     controller: WpgDemoCategoryController
        // })
    });
'use strict';

var WpgArticleCategoryController = BaseCategoryController.extend({
    _appName: "分类",
    _target: "article"
});
WpgArticleCategoryController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];

'use strict';

/**
 * 数据添加(更新)
 */

var WpgArticleEditController = BaseEditPageController.extend({
    _appUrl: "article",
    _isPreCreate: false,
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this;
        var distUrl = t.$url;
        t._appCode = t._$params.appcode;

        //写入scope的更多方法

        // //获取分类
        // $http.post(distUrl.categoryList, {app: t._appCode}).success(function(response) {
        //     $scope.categoryList = angular.copy(response.data.list);
        // })

        // //获取模板
        // $http.post(distUrl.tplList).success(function(response) {
        //     $scope.tplList = angular.copy(response.data);
        // })
    },
    onBeforeInitDone: function() {
        var t = this, scope = t._$scope, http = t._$http;

        var distUrl = window.WPGAdminConf.distUrl;
        var appCode = this._$params.appcode;
        t._appCode = appCode;
        if (appCode){
            http.post(distUrl.appShow, {app: appCode}).success(function(resp) {
                if (resp.code == 200) {
                    scope.$app = resp.data;
                    t._initFormData();
                }
            })
        }
    },
    initFormData: function(data){
        var t = this, scope = t._$scope, http = t._$http;
        if (t._isNew) {
            t._data = scope.article = {}
            t._prevData = angular.copy(scope.article);
        }else{
            http.post(t.$url.articleShow, {id: t._id}).success(function(response) {
                if (response.code === 200){
                    t._data = scope.article = angular.copy(response.data);
                    t._prevData = angular.copy(scope.article);
                    return false;
                }
            })
        }

        return scope.article;
    },
    getSaveData: function(data) {
        var t = this,scope = t._$scope;
        var data = angular.copy(scope.article);
        return data;
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "article/dataform.tpl.html"
        }
    }
});

WpgArticleEditController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgArticleController = BaseGridSPAController.extend({
    _idField: "id",
    _nameField: "title",   //单条数据获取提示
    _appUrl: "article",  //应用URL地址映射表的前缀
    _formtype: 2, //1:新窗口, 2:侧滑, 3:弹层
    _saveType: 1, //1:列表开头插入, 2:列表结尾处插入
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this,
            distUrl = this.$url;

        //写入scope的更多方法
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "article/dataform.tpl.html"
        }
    },
    initFormData: function(item){
        var t = this, scope = t._$scope;
        scope.article = item ? item : {};
    },
    getSaveData: function(){
        var t = this, scope = t._$scope;
        return scope.article;
    },
    getSearchData: function(){
        var ct = this;
        var data = [
            // {
            //     title: "demo标题",
            //     items: [{
            //         type: "shortcut",
            //         name: "_q",
            //         tag: "like",
            //         value: "",
            //         bind: "shortcutSearch.value"
            //     }]
            // },
            // {
            //     title: "所属栏目",
            //     items: [{
            //         type: "range",
            //         name: "category_id",
            //         choices: ct.$url.categoryAll + '?app=' + ct._appCode
            //     }]
            // }, {
            //     title: ct._appName + "属性",
            //     items: [
            //         { type: "link", name: "recommended", choices: [{ value: "1", name: "已推荐" }, { value: "0", name: "未推荐" }] },
            //         { type: "link", name: "sticky", choices: [{ value: "1", name: "已置顶" }, { value: "0", name: "未置顶" }] },
            //         { type: "link", name: "featured", choices: [{ value: "1", name: "是头条" }, { value: "0", name: "不是头条" }] }
            //     ]
            // }, {
            //     title: ct._appName + "状态",
            //     items: [{
            //         type: "link",
            //         name: "status",
            //         choices: [{ value: "published", name: "已发布" }, { value: "unpublished", name: "未发布" }, { value: "trash", name: "回收站" }]
            //     }]
            // }, {
            //     title: "发布时间",
            //     items: [{ type: "date", name: "created_time" }]
            // }, {
            //     title: "更新时间",
            //     items: [{ type: "date", name: "updated_time" }]
            // }
        ];
        return data;
    },
    getOrderData: function(){
        var data = [
            // {
            //     name: "标题",
            //     field: "title"
            // },
            // {
            //     name: "浏览次数",
            //     field: "view_count"
            // },
            // {
            //     name: "排序序号",
            //     field: "sequence"
            // },
            // {
            //     name: "发布时间",
            //     field: "created_time",
            //     checked: "desc"
            // },
            // {
            //     name: "更新时间",
            //     field: "updated_time"
            // }
        ];
        return data;
    }
});
WpgArticleController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgCodeCategoryController = BaseCategoryController.extend({
    _appName: "分类",
    _target: "code"
});
WpgCodeCategoryController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];

'use strict';

/**
 * 数据添加(更新)
 */

var WpgCodeEditController = BaseEditPageController.extend({
    _appUrl: "code",
    _isPreCreate: false,
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this;
        var distUrl = t.$url;
        t._appCode = t._$params.appcode;

        //写入scope的更多方法

        // //获取分类
        // $http.post(distUrl.categoryList, {app: t._appCode}).success(function(response) {
        //     $scope.categoryList = angular.copy(response.data.list);
        // })

        // //获取模板
        // $http.post(distUrl.tplList).success(function(response) {
        //     $scope.tplList = angular.copy(response.data);
        // })
    },
    onBeforeInitDone: function() {
        var t = this, scope = t._$scope, http = t._$http;

        var distUrl = window.WPGAdminConf.distUrl;
        var appCode = this._$params.appcode;
        t._appCode = appCode;
        if (appCode){
            http.post(distUrl.appShow, {app: appCode}).success(function(resp) {
                if (resp.code == 200) {
                    scope.$app = resp.data;
                    t._initFormData();
                }
            })
        }
    },
    initFormData: function(data){
        var t = this, scope = t._$scope, http = t._$http;
        if (t._isNew) {
            t._data = scope.code = {}
            t._prevData = angular.copy(scope.code);
        }else{
            http.post(t.$url.codeShow, {id: t._id}).success(function(response) {
                if (response.code === 200){
                    t._data = scope.code = angular.copy(response.data);
                    t._prevData = angular.copy(scope.code);
                    return false;
                }
            })
        }

        return scope.code;
    },
    getSaveData: function(data) {
        var t = this,scope = t._$scope;
        var data = angular.copy(scope.code);
        return data;
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "code/dataform.tpl.html"
        }
    }
});

WpgCodeEditController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgCodeController = BaseGridSPAController.extend({
    _idField: "id",
    _nameField: "title",   //单条数据获取提示
    _appUrl: "code",  //应用URL地址映射表的前缀
    _formtype: 2, //1:新窗口, 2:侧滑, 3:弹层
    _saveType: 1, //1:列表开头插入, 2:列表结尾处插入
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this,
            distUrl = this.$url;

        //写入scope的更多方法
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "code/dataform.tpl.html"
        }
    },
    initFormData: function(item){
        var t = this, scope = t._$scope;
        scope.code = item ? angular.copy(item) : {};
        return scope.code;
    },
    getSaveData: function(){
        var t = this, scope = t._$scope;
        console.log(scope.code);
        return scope.code;
    },
    getSearchData: function(){
        var ct = this;
        var data = [
            // {
            //     title: "demo标题",
            //     items: [{
            //         type: "shortcut",
            //         name: "_q",
            //         tag: "like",
            //         value: "",
            //         bind: "shortcutSearch.value"
            //     }]
            // },
            // {
            //     title: "所属栏目",
            //     items: [{
            //         type: "range",
            //         name: "category_id",
            //         choices: ct.$url.categoryAll + '?app=' + ct._appCode
            //     }]
            // }, {
            //     title: ct._appName + "属性",
            //     items: [
            //         { type: "link", name: "recommended", choices: [{ value: "1", name: "已推荐" }, { value: "0", name: "未推荐" }] },
            //         { type: "link", name: "sticky", choices: [{ value: "1", name: "已置顶" }, { value: "0", name: "未置顶" }] },
            //         { type: "link", name: "featured", choices: [{ value: "1", name: "是头条" }, { value: "0", name: "不是头条" }] }
            //     ]
            // }, {
            //     title: ct._appName + "状态",
            //     items: [{
            //         type: "link",
            //         name: "status",
            //         choices: [{ value: "published", name: "已发布" }, { value: "unpublished", name: "未发布" }, { value: "trash", name: "回收站" }]
            //     }]
            // }, {
            //     title: "发布时间",
            //     items: [{ type: "date", name: "created_time" }]
            // }, {
            //     title: "更新时间",
            //     items: [{ type: "date", name: "updated_time" }]
            // }
        ];
        return data;
    },
    getOrderData: function(){
        var data = [
            // {
            //     name: "标题",
            //     field: "title"
            // },
            // {
            //     name: "浏览次数",
            //     field: "view_count"
            // },
            // {
            //     name: "排序序号",
            //     field: "sequence"
            // },
            // {
            //     name: "发布时间",
            //     field: "created_time",
            //     checked: "desc"
            // },
            // {
            //     name: "更新时间",
            //     field: "updated_time"
            // }
        ];
        return data;
    }
});
WpgCodeController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgList2CategoryController = BaseCategoryController.extend({
    _appName: "分类",
    _target: "list2"
});
WpgList2CategoryController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];

'use strict';

/**
 * 数据添加(更新)
 */

var WpgList2EditController = BaseEditPageController.extend({
    _appUrl: "list2",
    _isPreCreate: false,
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this;
        var distUrl = t.$url;
        t._appCode = t._$params.appcode;

        //写入scope的更多方法

        // //获取分类
        // $http.post(distUrl.categoryList, {app: t._appCode}).success(function(response) {
        //     $scope.categoryList = angular.copy(response.data.list);
        // })

        // //获取模板
        // $http.post(distUrl.tplList).success(function(response) {
        //     $scope.tplList = angular.copy(response.data);
        // })
    },
    onBeforeInitDone: function() {
        var t = this, scope = t._$scope, http = t._$http;

        var distUrl = window.WPGAdminConf.distUrl;
        var appCode = this._$params.appcode;
        t._appCode = appCode;
        if (appCode){
            http.post(distUrl.appShow, {app: appCode}).success(function(resp) {
                if (resp.code == 200) {
                    scope.$app = resp.data;
                    t._initFormData();
                }
            })
        }
    },
    initFormData: function(data){
        var t = this, scope = t._$scope, http = t._$http;
        if (t._isNew) {
            t._data = scope.list2 = {}
            t._prevData = angular.copy(scope.list2);
        }else{
            http.post(t.$url.list2Show, {id: t._id}).success(function(response) {
                if (response.code === 200){
                    t._data = scope.list2 = angular.copy(response.data);
                    t._prevData = angular.copy(scope.list2);
                    return false;
                }
            })
        }

        return scope.list2;
    },
    getSaveData: function(data) {
        var t = this,scope = t._$scope;
        var data = angular.copy(scope.list2);
        return data;
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "list2/dataform.tpl.html"
        }
    }
});

WpgList2EditController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgList2Controller = BaseGridSPAController.extend({
    _idField: "id",
    _nameField: "title",   //单条数据获取提示
    _appUrl: "list2",  //应用URL地址映射表的前缀
    _formtype: 2, //1:新窗口, 2:侧滑, 3:弹层
    _saveType: 1, //1:列表开头插入, 2:列表结尾处插入
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this,
            distUrl = this.$url;

        //写入scope的更多方法
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "list2/dataform.tpl.html"
        }
    },
    initFormData: function(item){
        var t = this, scope = t._$scope;
        scope.list2 = item ? angular.copy(item) : {};
    },
    getSaveData: function(){
        var t = this, scope = t._$scope;
        return scope.list2;
    },
    getSearchData: function(){
        var ct = this;
        var data = [
            // {
            //     title: "demo标题",
            //     items: [{
            //         type: "shortcut",
            //         name: "_q",
            //         tag: "like",
            //         value: "",
            //         bind: "shortcutSearch.value"
            //     }]
            // },
            // {
            //     title: "所属栏目",
            //     items: [{
            //         type: "range",
            //         name: "category_id",
            //         choices: ct.$url.categoryAll + '?app=' + ct._appCode
            //     }]
            // }, {
            //     title: ct._appName + "属性",
            //     items: [
            //         { type: "link", name: "recommended", choices: [{ value: "1", name: "已推荐" }, { value: "0", name: "未推荐" }] },
            //         { type: "link", name: "sticky", choices: [{ value: "1", name: "已置顶" }, { value: "0", name: "未置顶" }] },
            //         { type: "link", name: "featured", choices: [{ value: "1", name: "是头条" }, { value: "0", name: "不是头条" }] }
            //     ]
            // }, {
            //     title: ct._appName + "状态",
            //     items: [{
            //         type: "link",
            //         name: "status",
            //         choices: [{ value: "published", name: "已发布" }, { value: "unpublished", name: "未发布" }, { value: "trash", name: "回收站" }]
            //     }]
            // }, {
            //     title: "发布时间",
            //     items: [{ type: "date", name: "created_time" }]
            // }, {
            //     title: "更新时间",
            //     items: [{ type: "date", name: "updated_time" }]
            // }
        ];
        return data;
    },
    getOrderData: function(){
        var data = [
            // {
            //     name: "标题",
            //     field: "title"
            // },
            // {
            //     name: "浏览次数",
            //     field: "view_count"
            // },
            // {
            //     name: "排序序号",
            //     field: "sequence"
            // },
            // {
            //     name: "发布时间",
            //     field: "created_time",
            //     checked: "desc"
            // },
            // {
            //     name: "更新时间",
            //     field: "updated_time"
            // }
        ];
        return data;
    }
});
WpgList2Controller.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgXxxxdsdCategoryController = BaseCategoryController.extend({
    _appName: "分类",
    _target: "xxxxdsd"
});
WpgXxxxdsdCategoryController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];

'use strict';

/**
 * 数据添加(更新)
 */

var WpgXxxxdsdEditController = BaseEditPageController.extend({
    _appUrl: "xxxxdsd",
    _isPreCreate: false,
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this;
        var distUrl = t.$url;
        t._appCode = t._$params.appcode;

        //写入scope的更多方法

        // //获取分类
        // $http.post(distUrl.categoryList, {app: t._appCode}).success(function(response) {
        //     $scope.categoryList = angular.copy(response.data.list);
        // })

        // //获取模板
        // $http.post(distUrl.tplList).success(function(response) {
        //     $scope.tplList = angular.copy(response.data);
        // })
    },
    onBeforeInitDone: function() {
        var t = this, scope = t._$scope, http = t._$http;

        var distUrl = window.WPGAdminConf.distUrl;
        var appCode = this._$params.appcode;
        t._appCode = appCode;
        if (appCode){
            http.post(distUrl.appShow, {app: appCode}).success(function(resp) {
                if (resp.code == 200) {
                    scope.$app = resp.data;
                    t._initFormData();
                }
            })
        }
    },
    initFormData: function(data){
        var t = this, scope = t._$scope, http = t._$http;
        if (t._isNew) {
            t._data = scope.xxxxdsd = {}
            t._prevData = angular.copy(scope.xxxxdsd);
        }else{
            http.post(t.$url.xxxxdsdShow, {id: t._id}).success(function(response) {
                if (response.code === 200){
                    t._data = scope.xxxxdsd = angular.copy(response.data);
                    t._prevData = angular.copy(scope.xxxxdsd);
                    return false;
                }
            })
        }

        return scope.xxxxdsd;
    },
    getSaveData: function(data) {
        var t = this,scope = t._$scope;
        var data = angular.copy(scope.xxxxdsd);
        return data;
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "xxxxdsd/dataform.tpl.html"
        }
    }
});

WpgXxxxdsdEditController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];
'use strict';

var WpgXxxxdsdController = BaseGridSPAController.extend({
    _idField: "id",
    _nameField: "title",   //单条数据获取提示
    _appUrl: "xxxxdsd",  //应用URL地址映射表的前缀
    _formtype: 2, //1:新窗口, 2:侧滑, 3:弹层
    _saveType: 1, //1:列表开头插入, 2:列表结尾处插入
    init: function($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify) {
        this._super($scope, $rootScope, $stateParams, $http, $timeout, $location, wpgPopup, wpgNotify);
        var t = this,
            distUrl = this.$url;

        //写入scope的更多方法
    },
    getTpl: function(){
        return {
            dataform: window.WPGAdminConf.distTpl + "xxxxdsd/dataform.tpl.html"
        }
    },
    initFormData: function(item){
        var t = this, scope = t._$scope;
        scope.xxxxdsd = item ? angular.copy(item) : {};
    },
    getSaveData: function(){
        var t = this, scope = t._$scope;
        return scope.xxxxdsd;
    },
    getSearchData: function(){
        var ct = this;
        var data = [
            // {
            //     title: "demo标题",
            //     items: [{
            //         type: "shortcut",
            //         name: "_q",
            //         tag: "like",
            //         value: "",
            //         bind: "shortcutSearch.value"
            //     }]
            // },
            // {
            //     title: "所属栏目",
            //     items: [{
            //         type: "range",
            //         name: "category_id",
            //         choices: ct.$url.categoryAll + '?app=' + ct._appCode
            //     }]
            // }, {
            //     title: ct._appName + "属性",
            //     items: [
            //         { type: "link", name: "recommended", choices: [{ value: "1", name: "已推荐" }, { value: "0", name: "未推荐" }] },
            //         { type: "link", name: "sticky", choices: [{ value: "1", name: "已置顶" }, { value: "0", name: "未置顶" }] },
            //         { type: "link", name: "featured", choices: [{ value: "1", name: "是头条" }, { value: "0", name: "不是头条" }] }
            //     ]
            // }, {
            //     title: ct._appName + "状态",
            //     items: [{
            //         type: "link",
            //         name: "status",
            //         choices: [{ value: "published", name: "已发布" }, { value: "unpublished", name: "未发布" }, { value: "trash", name: "回收站" }]
            //     }]
            // }, {
            //     title: "发布时间",
            //     items: [{ type: "date", name: "created_time" }]
            // }, {
            //     title: "更新时间",
            //     items: [{ type: "date", name: "updated_time" }]
            // }
        ];
        return data;
    },
    getOrderData: function(){
        var data = [
            // {
            //     name: "标题",
            //     field: "title"
            // },
            // {
            //     name: "浏览次数",
            //     field: "view_count"
            // },
            // {
            //     name: "排序序号",
            //     field: "sequence"
            // },
            // {
            //     name: "发布时间",
            //     field: "created_time",
            //     checked: "desc"
            // },
            // {
            //     name: "更新时间",
            //     field: "updated_time"
            // }
        ];
        return data;
    }
});
WpgXxxxdsdController.$inject = ["$scope", "$rootScope", "$stateParams", "$http", "$timeout", "$location", "wpgPopup", "wpgNotify"];