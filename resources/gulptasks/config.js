var srcDir = 'src',
    destDir = 'dist';

var libfileConf = {
        name: 'libfile',
        filename: 'lib',
        src: {
            js: [
                // 'libs/jquery/1.11.3/jquery-min.js',
                // 'libs/angularjs/1.4.8/angular.min.js',
                // 'libs/angularjs/1.4.8/i18n/angular-locale_zh-cn.js',
                // 'libs/angularjs/1.4.8/angular-route.min.js',
                // 'libs/angularjs/1.4.8/angular-animate.min.js',
                // 'libs/angularjs/1.4.8/angular-cookies.min.js',
                // 'libs/angularjs/1.4.8/angular-sanitize.min.js',
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
        dest: destDir + '/admin'
    };

//WPG配置
var wpgConf = {
        name: 'wpg',
        filename: 'wpg',
        src: {},
        dest: ''
    };
wpgConf.src = {
    coreJs: [
        wpgConf.name + '/core/controller/*.js',
        wpgConf.name + '/core/controller/*/*.js', 
        wpgConf.name + '/core/service/*.js', 
        wpgConf.name + '/core/*.js',
    ],
    coreTpl: [
        wpgConf.name + '/core/template/*/*.{html,tpl,tpl.html}'
    ],
    coreAll: [
        'dist/wpg/js/wpg-core.ctr.min.js',
        'dist/wpg/js/wpg-core.tpl.min.js',
        // wpgConf.name + '/core/controller/*.js',
        // wpgConf.name + '/core/controller/*/*.js', 
        // wpgConf.name + '/core/service/*.js', 
        // wpgConf.name + '/core/*.js',
        // wpgConf.name + '/dashboard/controller/*/*.js',
        // wpgConf.name + '/dashboard/*.js'
    ],
    benchJs: [
        wpgConf.name + '/bench/controller/*/*.js'
    ],
    benchTpl: [
        wpgConf.name + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    benchAll: [
        // 'dist/wpg/wpg-core.tpl.min.js',
        // 'dist/wpg/wpg-controller.tpl.min.js',
        // wpgConf.name + '/dashboard/*.js'
        // wpgConf.name + '/core/template/*/*.{html,tpl,tpl.html}',
        // wpgConf.name + '/dashboard/template/*/*.{html,tpl,tpl.html}'
        'dist/wpg/js/wpg-bench.ctr.min.js',
        'dist/wpg/js/wpg-bench.tpl.min.js',
    ],
    config: [
        wpgConf.name + '/bench/config/*.js',
        wpgConf.name + '/bench/*.js'
    ],
    all: [
        'dist/wpg/js/wpg-core.min.js',
        'dist/wpg/js/wpg-bench.min.js',
        'dist/wpg/js/wpg-conf.min.js',
    ],
    css: [],
    img: []
};
// wpgConf.src.all = wpgConf.src.core + wpgConf.src.controller;
wpgConf.dest = destDir + '/' + wpgConf.name

//WPG All配置
var wpgAllConf = {
        name: 'wpg',
        filename: 'wpg',
        src: {},
        dest: ''
    };
wpgAllConf.dir = wpgAllConf.name,
wpgAllConf.src = {
    js: [
        'dist/wpg/js/wpg-core.ctr.min.js',
        'dist/wpg/js/wpg-bench.ctr.min.js',
        'dist/wpg/js/wpg-conf.min.js',
        // wpgAllConf.name + '/core/controller/*.js',
        // wpgAllConf.name + '/core/controller/*/*.js', 
        // wpgAllConf.name + '/core/service/*.js', 
        // wpgAllConf.name + '/core/*.js',
        // wpgAllConf.name + '/dashboard/controller/*/*.js',
        // wpgAllConf.name + '/dashboard/*.js'
    ],
    tpl: [
        wpgAllConf.name + '/core/template/*/*.{html,tpl,tpl.html}',
        wpgAllConf.name + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    all: [
        'dist/wpg/js/wpg-all.ctr.min.js',
        'dist/wpg/js/wpg-all.tpl.min.js',
        'dist/wpg/js/wpg.conf.min.js',
    ],
    css: [
        'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
        'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.css',
        'libs/jquery-plugin/spectrum/1.8.0/spectrum.css',
        'libs/videojs/5.4.4/video-js.min.css',
        wpgAllConf.name + '/css/*.css',
        '!' + wpgAllConf.name + '/css/*.min.css',
        '!' + wpgAllConf.name + '/css/login.css'
    ],
    img: [
        wpgAllConf.name + '/img/*.*',
        wpgAllConf.name + '/img/*/*.*',
        wpgAllConf.name + '/img/*/*/*.*',
        wpgAllConf.name + '/img/*/*/*/*.*'
    ]
};
// wpgConf.src.all = wpgConf.src.core + wpgConf.src.controller;
wpgAllConf.dest = destDir + '/' + wpgAllConf.name

//admin配置
var adminConf = {
        name: 'admin',
        filename: 'all',
        src: {},
        dest: ''
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
adminConf.dest = destDir + '/' + adminConf.name

//web配置
var webConf = {};

//全部配置
var config = {
    libfile: libfileConf,
    wpg: wpgConf,
    wpgall: wpgAllConf,
    admin: adminConf,
    web: webConf,
};

module.exports = config;