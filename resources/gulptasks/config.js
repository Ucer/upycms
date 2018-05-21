var sourceDir = 'resources';
destDir = 'web/static/dist';


// upy 配置
var upyConf = {
    name: 'upy',
    filename: 'upy',
    dir: sourceDir + '/upy', //源目录
    src: {},
    dest: destDir + '/upy' // 目标目录
};
upyConf.src = {
    dir_coreJs: [ // ==> web/static/dist/upy/upy-core.ctr.min.js 「stp_one」
        upyConf.dir + '/core/controller/*.js',
        upyConf.dir + '/core/controller/*/*.js',
        upyConf.dir + '/core/service/*.js',
        upyConf.dir + '/core/*.js',
    ],
    dir_coreTpl: [// ==> web/static/dist/upy/upy-core.tpl.min.js 「stp_one」
        upyConf.dir + '/core/template/*/*.{html,tpl,tpl.html}'
    ],
    stp_one: [ //  ==> web/static/dist/upy/upy-core.min.js 「all_stp_one」
        upyConf.dest + '/js/upy-core.ctr.min.js',
        upyConf.dest + '/js/upy-core.tpl.min.js',
    ],


    dir_benchJs: [// ==> web/static/dist/upy/upy-bench.ctr.min.js 「stp_two」
        upyConf.dir + '/bench/controller/*/*.js'
    ],
    dir_benchTpl: [// ==> web/static/dist/upy/upy-bench.tpl.min.js  「stp_two」
        upyConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    dir_config: [ // ==> web/static/dist/upy/upy-conf.min.js 「all_stp_one」
        upyConf.dir + '/bench/config/*.js',
        upyConf.dir + '/bench/*.js'
    ],
    stp_two: [//  ==> web/static/dist/upy/upy-bench.min.js
        upyConf.dest + '/js/upy-bench.ctr.min.js',
        upyConf.dest + '/js/upy-bench.tpl.min.js',
    ],


    all_stp_one: [ //  ==> web/static/dist/upy/upy-all.ctr.min.js  「all_stp_two」
        upyConf.dest + '/js/upy-core.ctr.min.js',
        upyConf.dest + '/js/upy-core.tpl.min.js',
        upyConf.dest + '/js/upy-conf.min.js'
    ],
    all_tpl: [// ==> web/static/dist/upy/upy-all.tpl.min.js  「all_stp_two」
        upyConf.dir + '/core/template/*/*.{html,tpl,tpl.html}',
        upyConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    all_stp_two: [// ==> web/static/dist/upy/upy-all.min.js
        upyConf.dest + '/js/upy-all.ctr.min.js',
        upyConf.dest + '/js/upy-all.tpl.min.js',
        upyConf.dest + '/js/upy.conf.min.js',
    ],

    all_img: [ // ==> web/static/dist/upy/img/
        upyConf.dir + '/img/*.*',
        upyConf.dir + '/img/*/*.*',
        upyConf.dir + '/img/*/*/*.*',
        upyConf.dir + '/img/*/*/*/*.*'
    ],
    all_css: [ // ==> web/static/dist/upy/css/upy.min.css
        'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
        'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.css',
        'libs/jquery-plugin/spectrum/1.8.0/spectrum.css',
        'libs/videojs/5.4.4/video-js.min.css',
        upyConf.dir + '/css/*.css',
        '!' + upyConf.dir + '/css/*.min.css',
        '!' + upyConf.dir + '/css/login.css'
    ],

};


// admin 配置
var adminConf = {
    name: 'admin',
    filename: 'all',
    dir: sourceDir + '/src/admin', //源目录
    src: {},
    dest: destDir + '/admin' // 目标目录
};
adminConf.src = {
    img: [
        adminConf.dir + '/img/*.*'
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


};

var libfileConf = {
    name: 'libfile',
    filename: 'lib',
    src: {
        js: [
            'web/static/libs/lodash/3.10.1/lodash.min.js',
            'web/static/libs/moment/2.18.1/moment.min.js',
            'web/static/libs/moment/2.18.1/locale/zh-cn.js',
            'web/static/libs/moment-timezone/0.4.1/moment-timezone.min.js',
            'web/static/libs/angularjs-plugin/angular-moment/1.0.1/angular-moment.min.js',
            'web/static/libs/angularjs-plugin/angular-strap/2.3.12/angular-strap.js',
            'web/static/libs/angularjs-plugin/angular-strap/2.3.12/angular-strap.tpl.min.js',
            'web/static/libs/angularjs-plugin/angular-validator/2.5.4/w5cValidator.js',
            'web/static/libs/angularjs-plugin/ngInfiniteScroll/1.2.0/ng-infinite-scroll.min.js',
            'web/static/libs/jquery-plugin/plupload/2.1.8/plupload.full.min.js',
            'web/static/libs/jquery-plugin/jstree/3.3.4/jstree.min.js',
            'web/static/libs/jquery-plugin/lazyload/1.9.7/jquery.lazyload.js',
            'web/static/libs/sortable/1.4.0/sortable.min.js',
            'web/static/libs/sortable/1.4.0/ng-sortable.js',
            'web/static/libs/urijs/1.18.12/URI.min.js',
            'web/static/libs/urijs/1.18.12/IPv6.js',
            'web/static/libs/urijs/1.18.12/SecondLevelDomains.js',
            'web/static/libs/urijs/1.18.12/URI.fragmentQuery.js',
            'web/static/libs/urijs/1.18.12/URI.fragmentURI.js',
            'web/static/libs/urijs/1.18.12/URITemplate.js',
            'web/static/libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.js',
            'web/static/libs/jquery-plugin/iCheck/1.0.2/icheck.min.js',
            'web/static/libs/jquery-plugin/spectrum/1.8.0/spectrum.js',
            'web/static/libs/jquery-plugin/spectrum/1.8.0/spectrum-zh-cn.js',
            'web/static/libs/zeroclipboard/2.2.0/ZeroClipboard.min.js',
            'web/static/libs/angularjs-plugin/ng-clip/ng-clip.min.js',
            'web/static/libs/chartjs/Chart.min.js',
            'web/static/libs/chartjs/angular-chart.min.js',
            'web/static/libs/layer/laydate/5.0.7/laydate.js',
            'web/static/libs/Class.js',
        ],
        css: [],
        img: []
    },
    dest: destDir + '/admin'
};


//全部配置
var config = {
    upy: upyConf,
    admin: adminConf,
    libfile: libfileConf,
};

module.exports = config;