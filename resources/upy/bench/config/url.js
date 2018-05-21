'use strict';

angular.module('upy.bench.config.url', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        window.UPYAdminConf.distUpyTpl = "upy/tpl/upy.bench.";
        var upyTpl = window.UPYAdminConf.distUpyTpl;
        var distTpl = window.UPYAdminConf.distTpl;
    });

