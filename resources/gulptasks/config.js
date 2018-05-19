/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

var srcDir = 'src', distDir = 'web/static/dist';

var libfileConf = {
        name: 'libfile',
        filename: 'lib',
        src: {
            js: [
                'libs/lodash/3.10.1/lodash.min.js',
                'libs/moment/2.18.1/moment.min.js',
                'libs/moment/2.18.1/locale/zh-cn.js',
                'libs/moment-timezone/0.4.1/moment-timezone.min.js',
                'libs/angularjs-plugin/angular-moment/1.0.1/angular-moment.min.js',
                'libs/angularjs-plugin/angular-strap/2.3.12/angular-strap.js',
                'libs/angularjs-plugin/angular-strap/2.3.12/angular-strap.tpl.min.js',
                'libs/angularjs-plugin/angular-validator/2.5.4/w5cValidator.js',
                'libs/angularjs-plugin/ngInfiniteScroll/1.2.0/ng-infinite-scroll.min.js',
                'libs/jquery-plugin/plupload/2.1.8/plupload.full.min.js',
                'libs/jquery-plugin/jstree/3.3.4/jstree.min.js',
                'libs/jquery-plugin/lazyload/1.9.7/jquery.lazyload.js',
                'libs/sortable/1.4.0/sortable.min.js',
                'libs/sortable/1.4.0/ng-sortable.js',
                'libs/urijs/1.18.12/URI.min.js',
                'libs/urijs/1.18.12/IPv6.js',
                'libs/urijs/1.18.12/SecondLevelDomains.js',
                'libs/urijs/1.18.12/URI.fragmentQuery.js',
                'libs/urijs/1.18.12/URI.fragmentURI.js',
                'libs/urijs/1.18.12/URITemplate.js',
                'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.js',
                'libs/jquery-plugin/iCheck/1.0.2/icheck.min.js',
                'libs/jquery-plugin/spectrum/1.8.0/spectrum.js',
                'libs/jquery-plugin/spectrum/1.8.0/spectrum-zh-cn.js',
                'libs/zeroclipboard/2.2.0/ZeroClipboard.min.js',
                'libs/angularjs-plugin/ng-clip/ng-clip.min.js',
                'libs/chartjs/Chart.min.js',
                'libs/chartjs/angular-chart.min.js',
                'libs/layer/laydate/5.0.7/laydate.js',
                'libs/Class.js',
              ],
            css: [],
            img: []
        },
        dist: distDir + '/admin'
    };

var upyConf = {
        name: 'resources/upy',
        filename: 'upy',
        src: {},
        dist: ''
    };
upyConf.src = {
    coreJs: [
        upyConf.name + '/core/controller/*.js',
        upyConf.name + '/core/controller/*/*.js',
        upyConf.name + '/core/service/*.js',
        upyConf.name + '/core/*.js',
    ],
    coreTpl: [
        upyConf.name + '/core/template/*/*.{html,tpl,tpl.html}'
    ],
    coreAll: [
        'dist/upy/js/upy-core.ctr.min.js',
        'dist/upy/js/upy-core.tpl.min.js',

    ],
    benchJs: [
        upyConf.name + '/bench/controller/*/*.js'
    ],
    benchTpl: [
        upyConf.name + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    benchAll: [
        'dist/upy/js/upy-bench.ctr.min.js',
        'dist/upy/js/upy-bench.tpl.min.js',
    ],
    config: [
        upyConf.name + '/bench/config/*.js',
        upyConf.name + '/bench/*.js'
    ],
    all: [
        'dist/upy/js/upy-core.min.js',
        'dist/upy/js/upy-bench.min.js',
        'dist/upy/js/upy-conf.min.js',
    ],
    css: [],
    img: []
};
// upyConf.src.all = upyConf.src.core + upyConf.src.controller;
upyConf.dist = distDir + '/' + upyConf.name

//WPG All配置
var upyAllConf = {
        name: 'resources/upy',
        filename: 'upy',
        src: {},
        dist: ''
    };
upyAllConf.dir = upyAllConf.name,
upyAllConf.src = {
    js: [
        'dist/upy/js/upy-core.ctr.min.js',
        'dist/upy/js/upy-bench.ctr.min.js',
        'dist/upy/js/upy-conf.min.js',
    ],
    tpl: [
        upyAllConf.name + '/core/template/*/*.{html,tpl,tpl.html}',
        upyAllConf.name + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    all: [
        'dist/upy/js/upy-all.ctr.min.js',
        'dist/upy/js/upy-all.tpl.min.js',
        'dist/upy/js/upy.conf.min.js',
    ],
    css: [
        'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
        'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.css',
        'libs/jquery-plugin/spectrum/1.8.0/spectrum.css',
        'libs/videojs/5.4.4/video-js.min.css',
        upyAllConf.name + '/css/*.css',
        '!' + upyAllConf.name + '/css/*.min.css',
        '!' + upyAllConf.name + '/css/login.css'
    ],
    img: [
        upyAllConf.name + '/img/*.*',
        upyAllConf.name + '/img/*/*.*',
        upyAllConf.name + '/img/*/*/*.*',
        upyAllConf.name + '/img/*/*/*/*.*'
    ]
};
// upyConf.src.all = upyConf.src.core + upyConf.src.controller;
upyAllConf.dist = distDir + '/' + upyAllConf.name;

//admin配置
var adminConf = {
        name: 'admin',
        filename: 'all',
        src: {},
        dist: ''
    };
adminConf.dir = srcDir + '/' + adminConf.name,
adminConf.src = {
    js: [
        adminConf.dir + '/js/*.js',
        adminConf.dir + '/js/*/*.js',
        adminConf.dir + '/js/*/*/*.js',
        adminConf.dir + '/js/*/*/*/*.js',
    ],
    tpl: [
        adminConf.dir + '/tpl/*.{html,tpl,tpl.html}',
        adminConf.dir + '/tpl/*/*.{html,tpl,tpl.html}',
        adminConf.dir + '/tpl/*/*/*.{html,tpl,tpl.html}',
        adminConf.dir + '/tpl/*/*/*/*.{html,tpl,tpl.html}',
    ],
    css: [
        adminConf.dir + '/css/*.css',
        'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
        'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.css',
        'libs/jquery-plugin/spectrum/1.8.0/spectrum.css',
        'libs/videojs/5.4.4/video-js.min.css',
        '!' + adminConf.dir + '/css/*.min.css',
        '!' + adminConf.dir + '/css/login.css'
    ],
    img: [adminConf.dir + '/img/*.*']
};
adminConf.dist = distDir + '/' + adminConf.name;

//web配置
var webConf = {};

//全部配置
var config = {
    libfile: libfileConf,
    upy: upyConf,
    upyall: upyAllConf,
    admin: adminConf,
    web: webConf,
};

module.exports = config;