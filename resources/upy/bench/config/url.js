'use strict';

angular.module('wpg.bench.config.url', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        window.WPGAdminConf.distWpgTpl = "wpg/tpl/wpg.bench.";
        var wpgTpl = window.WPGAdminConf.distWpgTpl;
        var distTpl = window.WPGAdminConf.distTpl;

        $stateProvider.state('wpg_appdata_manage', {
            url: '/app/:appcode',
            templateUrl: function($stateParams) {
                var appCode = $stateParams.appcode;
                if (angular.isDefined(window.WPGAdminConf.appTypeData)) {
                    var appTpl = window.WPGAdminConf.appTypeData[appCode];
                    if (appTpl && appTpl != "custom"){
                        return wpgTpl + appTpl + '/index.tpl.html';
                    }else{
                        return distTpl + appCode + '/index.tpl.html';
                    }
                }
            },
            controllerProvider: function($stateParams) {
                var appCode = $stateParams.appcode;
                if (angular.isDefined(window.WPGAdminConf.appTypeData)) {
                    var appTpl = window.WPGAdminConf.appTypeData[appCode];
                    if (appTpl === "app") {
                        appTpl = "appdata";
                    }

                    if (appTpl && appTpl != "custom"){
                        return "Wpg" + _.capitalize(appTpl) + "Controller";
                    }else{
                        return eval("Wpg" + _.capitalize(appCode) + "Controller");
                    }
                }
            }
        })
        .state('wpg_appdata_edit', {
            url: '/app/:appcode/edit?id?type',
            templateUrl: function($stateParams) {
                var appCode = $stateParams.appcode;
                if (angular.isDefined(window.WPGAdminConf.appTypeData)) {
                    var appTpl = window.WPGAdminConf.appTypeData[appCode];
                    if (appTpl && appTpl != "custom"){
                        return wpgTpl + appTpl + '/edit.tpl.html';
                    }else{
                        return distTpl + appCode + '/edit.tpl.html';
                    }
                }
            },
            controllerProvider: function($stateParams) {
                var appCode = $stateParams.appcode;
                if (angular.isDefined(window.WPGAdminConf.appTypeData)) {
                    var appTpl = window.WPGAdminConf.appTypeData[appCode];
                    if (appTpl === "app") {
                        appTpl = "appdata";
                    }

                    if (appTpl && appTpl != "custom"){
                        return "Wpg" + _.capitalize(appTpl) + "EditController";
                    }else{
                        return eval("Wpg" + _.capitalize(appCode) + "EditController");
                    }
                }
            }
        })
        .state('wpg_article_category', {
            url: '/app/:appcode/category',
            templateUrl: wpgTpl + 'category/index.tpl.html',
            controller: WpgArticleCategoryController
        })
        .state('wpg_appdata_category', {
            url: '/app/:appcode/f-:field',
            templateUrl: wpgTpl + 'category/index.tpl.html',
            controller: WpgAppdataCategoryController
        })
        .state('wpg_appmgr_manage', {
            url: '/coding/appmgr',
            templateUrl: wpgTpl + 'app/app-manager.tpl.html',
            controller: WpgAppManagerController
        })
        // .state('wpg_appmgr_designer', {
        //     url: '/coding/app/designer/:table',
        //     templateUrl: wpgTpl + 'app/app-designer.tpl.html',
        //     controller: WpgAppDesignerController
        // })
        .state('wpg_appmgr_designer', {
            url: '/coding/app/designer/:table',
            templateUrl: wpgTpl + 'app/app-designer.tpl.html',
            controller: WpgAppDesignerController
        })
        .state('wpg_coding_update', {
            url: '/coding/update',
            templateUrl: wpgTpl + 'version/index.tpl.html',
            controller: WpgUpdateController
        })
        .state('wpg_appset_category', {
            url: '/setting/app/category',
            templateUrl: wpgTpl + 'category/index.tpl.html',
            controller: WpgCategoryController
        })
        .state('wpg_appset_fragment', {
            url: '/setting/app/fragment',
            templateUrl: wpgTpl + 'app/fragment-manager.tpl.html',
            controller: WpgFragmentController
        })
        .state('wpg_appset_position', {
            url: '/setting/app/position',
            templateUrl: wpgTpl + 'app/position-manager.tpl.html',
            controller: WpgPositionController
        })
        .state('wpg_appset_tagmgr', {
            url: '/setting/app/tagmgr',
            templateUrl: wpgTpl + 'app/tag-manager.tpl.html',
            controller: WpgTagController
        })
        .state('wpg_applog_tagmgr', {
            url: '/log',
            templateUrl: wpgTpl + 'app/app-log.tpl.html',
            controller: WpgLogController
        })
        .state('wpg_navigation', {
            url: '/coding/navigation',
            templateUrl: wpgTpl + 'navigation/index.tpl.html',
            controller: WpgNavigationController
        })
        .state('wpg_language', {
            url: '/coding/language',
            templateUrl: wpgTpl + 'language/index.tpl.html',
            controller: WpgLanguageController
        })
        .state('wpg_setting_navigation', {
            url: '/setting/navigation',
            templateUrl: wpgTpl + 'navigation/index.tpl.html',
            controller: WpgNavigationController
        })
        .state('wpg_adminuser', {
            url: '/setting/manager',
            templateUrl: wpgTpl + 'setting/manager.tpl.html',
            controller: WpgManagerController
        })
        .state('wpg_role', {
            url: '/setting/role',
            templateUrl: wpgTpl + 'setting/role.tpl.html',
            controller: WpgRoleController
        })
        .state('wpg_setting_start', {　　　　　　　　　　　　 //路由匹配规则
            url: '/setting',
            templateUrl: wpgTpl + 'setting/site.tpl.html',
            controller: WpgSettingController
        })
        .state('wpg_setting_all', {　　　　　　　　　　　　 //路由匹配规则
            url: '/setting/:settype',
            templateUrl: function($stateParams) {
                var settype = $stateParams.settype;
                return wpgTpl + 'setting/'+settype+'.tpl.html';
            },
            controller: WpgSettingController
        })
        .state('wpg_imgmgr', {
            url: '/imgmgr',
            templateUrl: wpgTpl + 'imgmgr/index.tpl.html',
            controller: WpgImageMgrController
        })
        .state('wpg_imgmgr2', {
            url: '/imgmgr2',
            templateUrl: wpgTpl + 'imgmgr/index2.tpl.html',
            controller: WpgImageMgr2Controller
        })
        .state('wpg_filemgr', {
            url: '/filemgr',
            templateUrl: wpgTpl + 'filemgr/index.tpl.html',
            controller: WpgFileMgrController
        })
        .state('wpg_filemgr2', {
            url: '/coding/filemgr',
            templateUrl: wpgTpl + 'filemgr2/index.tpl.html',
            controller: WpgFileMgr2Controller
        })
        .state('wpg_coding_develper', {
            url: '/coding/app/developer/:appcode',
            templateUrl: wpgTpl + 'filemgr2/index.tpl.html',
            controller: WpgFileMgr2Controller
        })
        .state('wpg_video', {
            url: '/video',
            templateUrl: wpgTpl + 'video/index.tpl.html',
            controller: WpgVideoController
        })
    })
    .controller('WpgArticleController', WpgArticleController)
    .controller('WpgArticleEditController', WpgArticleEditController)
    .controller("WpgPageController", WpgPageController)
    .controller('WpgPageEditController', WpgPageEditController)
    .controller('WpgArticleCategoryController', WpgArticleCategoryController)
    .controller("WpgAppdataController", WpgAppdataController)
    .controller("WpgAppdataEditController", WpgAppdataEditController)
    .controller("WpgAppdataCategoryController", WpgAppdataCategoryController)
    .filter('fileTypeDisplay', function() {
        return function(value) {
            var typeList = {
                'word': 'Word文档',
                'excel': 'Excel文档',
                'powerpoint': 'PPT文档',
                'pdf': 'PDF文档',
                'image': '图片',
                'video': '视频',
                'audio': '音频',
                'zip': '压缩文件',
                'other': '其他文件',
            };

            return typeList[value];
        }
    })
    .filter('durationDisplay', function() {
        return function(value) {
            var second = parseInt(value);
            var minute = 0;
            var hour = 0;

            if(second > 60) {
                minute = parseInt(second/60);
                second = parseInt(second%60);
                if(minute > 60) {
                    hour = parseInt(minute/60);
                    minute = parseInt(minute%60);
                }
            }

            var result = ""+parseInt(second)+"";
            if(minute > 0) {
                result = parseInt(second) >= 10 ? ""+parseInt(second)+"" : "0"+parseInt(second)+"";
                result = parseInt(minute) >= 10 ? ""+parseInt(minute)+":"+result : "0"+parseInt(minute)+":"+result;
            }

            if(hour > 0) {
                result = ""+parseInt(hour)+":"+result;
            }

            return result;
        }
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('filemgr/rename.tpl.html', '<div class="form-group"><div class="control-label" ng-bind="label"></div><div class="controls mtm"><div class="input-group" ng-if="item.isFile"><input type="text" class="form-control" ng-model="item.name" placeholder="请输入图片名称" /><span class="input-group-addon" ng-bind="item.ext"></span></div><input type="text" class="form-control" ng-model="item.name" placeholder="请输入相册名称" ng-if="item.isDir" /></div></div>');
        $templateCache.put('filemgr/altedit.tpl.html', '<div class="form-group"><div class="controls"><input type="text" class="form-control" ng-model="image.alt" placeholder="请输入图片 alt" /><div class="text-muted mtm">编写简洁的文字描述图片内容：<br>1、有利于搜索引擎优化。<br>2、当图片加载缓慢或失败时，将显示 alt 文字，以增强用户体验。</div></div></div>');
        $templateCache.put('filemgr/uploadwithurl.tpl.html', '<div class="form-group"><div class="control-label">网络文件地址</div><div class="controls mtm"><input type="text" class="form-control" ng-model="file.url" placeholder="请输入网络文件地址" /></div></div>');
        $templateCache.put('filemgr/createdir.tpl.html', '<div class="form-group"><div class="control-label">相册名</div><div class="controls mtm"><input type="text" class="form-control" ng-model="album.name" placeholder="请输入相册名称" /></div></div>');
        $templateCache.put('filemgr/outsideImage.tpl.html', '<div class="form-group"><div class="control-label">外部链接URL地址</div><div class="controls mtm"><input type="text" class="form-control" ng-model="image.url" placeholder="http://" /></div></div>');
        $templateCache.put('imgmgr/rename.tpl.html', '<div class="form-group" ng-class="{true:' + '\'has-error\'' + '}[errors.name]"><div class="control-label" ng-bind="label"></div><div class="controls mtm"><div class="input-group" ng-if="item.isFile"><input type="text" class="form-control" ng-model="item.name" wpg-validator="required" placeholder="请输入图片名称" /><span class="input-group-addon" ng-bind="item.ext"></span></div><input type="text" class="form-control" ng-model="item.name" wpg-validator="required" placeholder="请输入相册名称" ng-if="item.isDir" /></div></div>');
        $templateCache.put('imgmgr/altedit.tpl.html', '<div class="form-group"><div class="controls"><input type="text" class="form-control" ng-model="image.alt" placeholder="请输入图片 alt" /><div class="text-muted mtm">编写简洁的文字描述图片内容：<br>1、有利于搜索引擎优化。<br>2、当图片加载缓慢或失败时，将显示 alt 文字，以增强用户体验。</div></div></div>');
        $templateCache.put('imgmgr/uploadwithurl.tpl.html', '<div class="form-group"><div class="control-label">网络图片地址</div><div class="controls mtm"><input type="text" class="form-control" ng-model="image.url" wpg-validator="required|requiredHttp" placeholder="请输入网络图片地址" /></div></div>');
        $templateCache.put('imgmgr/createalbum.tpl.html', '<div class="form-group"><div class="control-label">相册名</div><div class="controls mtm"><input type="text" class="form-control" ng-model="album.name" placeholder="请输入相册名称" /></div></div>');
        $templateCache.put('imgmgr/outsideImage.tpl.html', '<div class="form-group"><div class="control-label">外部链接URL地址</div><div class="controls mtm"><input type="text" class="form-control" ng-model="image.url" placeholder="http://" /></div></div>');
    }]);