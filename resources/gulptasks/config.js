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

};





//全部配置
var config = {
    upy: upyConf,
    // upyall: upyAllConf,
    // admin: adminConf,
};

module.exports = config;