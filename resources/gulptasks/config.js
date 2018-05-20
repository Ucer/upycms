var srcDir = 'src',
    destDir = 'web/static/dist';


// upy
var upyConf = {
    name: 'upy',
    filename: 'upy',
    dir: 'resources/upy',
    src: {},
    dest: ''
};
upyConf.dest = destDir + '/' + upyConf.name;
upyConf.src = {
    css: [],
    img: [],
    config: [
        upyConf.dir + '/bench/config/*.js',
        upyConf.dir + '/bench/*.js'
    ],
};


var upyAllConf = {
    name: 'upy',
    filename: 'upy',
    src: {},
    dest: ''
};
upyAllConf.dir = 'resources/' + upyAllConf.name;
upyAllConf.dest = destDir + '/' + upyAllConf.name;
upyAllConf.src = {
    tpl: [
        upyAllConf.dir + '/core/template/*/*.{html,tpl,tpl.html}',
        upyAllConf.dir + '/bench/template/*/*.{html,tpl,tpl.html}'
    ],
    js: [
        'dist/upy/js/upy-core.ctr.min.js',
        'dist/upy/js/upy-bench.ctr.min.js',
        'dist/upy/js/upy-conf.min.js',
    ],
    all: [
        'dist/upy/js/upy-all.ctr.min.js',
        'dist/upy/js/upy-all.tpl.min.js',
        'dist/upy/js/upy.conf.min.js',
    ],
    css: [
        'libs/bootstrap-plugin/bootstrap-additions/0.3.1/bootstrap-additions.min.css',
        upyAllConf.name + '/css/*.css',
        '!' + upyAllConf.name + '/css/*.min.css',
        '!' + upyAllConf.name + '/css/login.css'
    ],
};


var adminConf = {
    name: 'admin',
    filename: 'all',
    src: {},
    dest: ''
};
adminConf.dir = srcDir + '/' + adminConf.name;
adminConf.dest = destDir + '/' + adminConf.name;
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

//全部配置
var config = {
    upy: upyConf,
    upyall: upyAllConf,
    admin: adminConf,
};

module.exports = config;