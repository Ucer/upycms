'use strict';

/**
 * 定义应用的路由
 */

angular.module('wpg.config', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        var distTpl = window.WPGAdminConf.distTpl;

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