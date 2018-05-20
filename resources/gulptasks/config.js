var srcDir = 'src',
    sourceDir = 'resources';
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


    // all_stp_one: [ //  ==> web/static/dist/upy/upy-all.ctr.min.js  「all_stp_two」
    //     upyConf.dest + '/js/upy-core.ctr.min.js',
    //     upyConf.dest + '/js/upy-core.tpl.min.js',
    //     upyConf.dest + '/js/upy-conf.min.js'
    // ],
    all_tpl: [// ==> web/static/dist/upy/upy-all.tpl.min.js  「all_stp_two」
        upyConf.dir + '/core/template/*/*.{html,tpl,tpl.html}',
        upyConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],


    // all_stp_two: [// ==> web/static/dist/upy/upy-all.min.js
    //     upyConf.dest + '/js/upy-all.ctr.min.js',
    //     upyConf.dest + '/js/upy-all.tpl.min.js',
    //     // 'dist/wpg/js/wpg.conf.min.js',
    // ],

    // tpl: [
    //     upyAllConf.dir + '/core/template/*/*.{html,tpl,tpl.html}',
    //     upyAllConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
    // ],
    // dist_coreAllJs: [
    //     upyConf.dest + '/js/upy-core.ctr.min.js',
    //     upyConf.dest + '/js/upy-core.tpl.min.js',
    // ],
    // dist_dist_js: [
    //     upyConf.dest + '/js/upy-core.ctr.min.js',
    //     upyConf.dest + '/js/upy-bench.ctr.min.js',
    //     upyConf.dest + '/js/upy-conf.min.js',
    // ],
    //
    // css: [],
    // img: [],
    // config: [
    //     upyConf.dir + '/bench/config/*.js',
    //     upyConf.dir + '/bench/*.js'
    // ],
};

//
// var upyAllConf = {
//     name: 'upy',
//     filename: 'upy',
//     dir: sourceDir + '/upy', //源目录
//     src: {},
//     dest: destDir + '/upy' // 目标目录
// };
// upyAllConf.src = {
//     all_tpl: [
//         upyAllConf.dir + '/core/template/*/*.{html,tpl,tpl.html}',
//         upyAllConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
//     ],
//     dist_js: [
//         'dist/upy/js/upy-core.ctr.min.js',
//         'dist/upy/js/upy-bench.ctr.min.js',
//         'dist/upy/js/upy-conf.min.js',
//     ],
//     dist_all: [
//         upyAllConf.dest + '/js/upy-all.ctr.min.js',
//         upyAllConf.dest + '/js/upy-all.tpl.min.js',
//         upyAllConf.dest + '/js/upy.conf.min.js',
//     ],
//
// };


// var adminConf = {
//     name: 'admin',
//     filename: 'all',
//     src: {},
//     dest: ''
// };
// adminConf.dir = srcDir + '/' + adminConf.name;
// adminConf.dest = destDir + '/' + adminConf.name;
// adminConf.src = {
//     js: [
//         adminConf.dir + '/js/*.js',
//         adminConf.dir + '/js/*/*.js',
//         adminConf.dir + '/js/*/*/*.js',
//         adminConf.dir + '/js/*/*/*/*.js',
//     ],
//     tpl: [
//         adminConf.dir + '/tpl/*.{html,tpl,tpl.html}',
//         adminConf.dir + '/tpl/*/*.{html,tpl,tpl.html}',
//         adminConf.dir + '/tpl/*/*/*.{html,tpl,tpl.html}',
//         adminConf.dir + '/tpl/*/*/*/*.{html,tpl,tpl.html}',
//     ],
//     css: [
//         adminConf.dir + '/css/*.css',
//         'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
//         'libs/jquery-plugin/clockpicker/0.0.7/bootstrap-clockpicker.min.css',
//         'libs/jquery-plugin/spectrum/1.8.0/spectrum.css',
//         'libs/videojs/5.4.4/video-js.min.css',
//         '!' + adminConf.dir + '/css/*.min.css',
//         '!' + adminConf.dir + '/css/login.css'
//     ],
//     img: [adminConf.dir + '/img/*.*']
// };

//全部配置
var config = {
    upy: upyConf,
    // upyall: upyAllConf,
    // admin: adminConf,
};

module.exports = config;