/*
 * 打包WPGUI文件
 * 安装nodejs npm gulp和gulp相关插件
 */

'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');  
var concat = require('gulp-concat');
var htmlmin = require("gulp-htmlmin");
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin'); 
var minifycss = require('gulp-clean-css');
var stripDebug = require('gulp-strip-debug');
var config = require('./config.js').wpg;
var configAll = require('./config.js').wpgall;

var destJs = config.dest + '/js';
var html2jsOptions = {
    moduleName: function(file){
        var filepath = file.path.replace(/\\/g, "/");
        var pathList = filepath.split('/');
        var folder = pathList[pathList.length - 2];
        var filename = pathList[pathList.length - 1];
        var filename = filename.replace(/\.tpl\.html|\.tpl/g, "");
        var folderList = folder.split('.');
        // folderList[0] = folderList[0].toUpperCase();
        var modname = folderList.join('.');
        return modname;
    },
    prefix: "wpg/tpl/"
};

gulp.task('compress-wpg-step1', function() {  
    return gulp.src(config.src.coreJs)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-core-ctr.js'))
        // .pipe(gulp.dest(config.dest))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true,remove: true}))
        // .pipe(stripDebug())
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + '-core.ctr.min.js'))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step2', function() {  
    return gulp.src(config.src.coreTpl)
        .pipe(changed(config.name + '-tpl', {extension: 'html'}))
        .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(ngHtml2Js(html2jsOptions))
        .pipe(concat(config.filename + "-core.tpl.tmp.js"))
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + "-core.tpl.min.js"))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step3', function() {  
    return gulp.src(config.src.benchJs)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-bench.ctr.js'))
        // .pipe(gulp.dest(config.dest))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true,remove: true}))
        // .pipe(stripDebug())
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + '-bench.ctr.min.js'))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step4', function() {  
    return gulp.src(config.src.benchTpl)
        .pipe(changed(config.name + '-tpl', {extension: 'html'}))
        .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(ngHtml2Js(html2jsOptions))
        .pipe(concat(config.filename + "-bench.tpl.tmp.js"))
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + "-bench.tpl.min.js"))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step5', function() {  
    return gulp.src(config.src.config)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filenae + '-config.js'))
        // .pipe(gulp.dest(config.dest))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true,remove: true}))
        // .pipe(stripDebug())
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + '-conf.min.js'))
        .pipe(gulp.dest(destJs));
});


gulp.task('compress-wpg-core', [
    'compress-wpg-step1', 
    'compress-wpg-step2'
    ], function() {  
    return gulp.src(config.src.coreAll)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-core.min.js'))
        .pipe(gulp.dest(destJs));
});



gulp.task('compress-wpg-bench', [
    'compress-wpg-step3', 
    'compress-wpg-step4',
    'compress-wpg-step5'
    ], function() {  
    return gulp.src(config.src.benchAll)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-bench.min.js'))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step6', [
    'compress-wpg-core',
    'compress-wpg-bench'
    ], function() {  
    return gulp.src(configAll.src.js)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-all.ctr.min.js'))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-step7', function() {  
    return gulp.src(configAll.src.tpl)
        .pipe(changed(config.name + '-tpl', {extension: 'html'}))
        .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(ngHtml2Js(html2jsOptions))
        .pipe(concat(config.filename + "-all.tpl.tmp.js"))
        .pipe(uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }))
        .pipe(concat(config.filename + "-all.tpl.min.js"))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-all', [
    'compress-wpg-step6', 
    'compress-wpg-step7'
    ], function() {
    gulp.src(configAll.src.all)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-all.min.js'))
        .pipe(gulp.dest(destJs));
});

gulp.task('compress-wpg-css', function() {  
    gulp.src(configAll.src.img)
        .pipe(gulp.dest(config.dest + '/img'));

    gulp.src(configAll.src.css)
        .pipe(concat(config.filename + '.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat(config.filename + '.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));

    gulp.src([configAll.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));

    gulp.src([configAll.dir + '/css/file.css'])
        .pipe(concat('file.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('file.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('compress-wpg', function() {
    gulp.start('compress-wpg-core');
    gulp.start('compress-wpg-bench');
    gulp.start('compress-wpg-all');
    gulp.start('compress-wpg-css');
});  

//说明
gulp.task('help',function () {
    console.log('gulp build                  文件打包');
    console.log('gulp help                   参数说明');
});

/* 默认 */
gulp.task('default',function () {
    gulp.start('help');
});