'use strict';


angular.module('upy.run', [])

    .constant('angularMomentConfig', {
        timezone: 'zh-cn' // optional
    })

    .config(['ngClipProvider', function(ngClipProvider) {
        ngClipProvider.setPath("/static/libs/zeroclipboard/2.2.0/ZeroClipboard.swf");
    }])

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

    .run(function($rootScope, $window, $location, $timeout, $state, $http, wpgPopup, wpgNotify) {

        var distUrl = window.WPGAdminConf.distUrl;
        $rootScope.siteInfo = { 
            name: 'UPYCMS',
            url: window.UPYAdminConf.siteUrl
        };
        $rootScope.pageTitle = "UPYCMS - 管理后台";
        $rootScope.templateUrl = {
            header: window.WPGAdminConf.distWpgTpl + 'layout/header.tpl.html'
        };

        $rootScope.name = window.UPYAdminConf.name;
        $rootScope.version = window.UPYAdminConf.version;
        $rootScope.menuList = [];

        //初始化数据
        var initUPYAdmin = function(){
            $http.post(window.UPYAdminConf.initUrl).success(function(resp) {
                if (resp.status === true) {
                    var data = resp.data;
                    $rootScope.navList = data.navlist;
                    $rootScope.account = data.account;
                    $rootScope.siteInfo = angular.extend({}, $rootScope.siteInfo, data.setting.site);
                    $rootScope.initDone = true;
                    $rootScope.$data = data;
                    $rootScope.setting = data.setting;
                }else{
                    wpgNotify.danger(resp.msg);
                }
            }).error(function(){
                wpgNotify.danger("出现未知错误，请稍后再试！");
            })
        };
        initUPYAdmin();

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




        //初始化成功后执行
        $rootScope.$watch('initDone', function(value) {
            openPageWindow();
            //跳转URL
            if (value === true && gotoState && angular.isDefined($state.go)) {
                $state.go(gotoState.name, gotoStateParams);
            }
        });

    });