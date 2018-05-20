/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
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
var config = require('./config.js').upy;
var configAll = require('./config.js').upyall;

var destJs = config.dest + '/js';
var html2jsOptions = {
    moduleName: function(file){
        var filepath = file.path.replace(/\\/g, "/");
        var pathList = filepath.split('/');
        var folder = pathList[pathList.length - 2];
        var filename = pathList[pathList.length - 1];
        var filename = filename.replace(/\.tpl\.html|\.tpl/g, "");
        var folderList = folder.split('.');
        var modname = folderList.join('.');
        return modname;
    },
    prefix: "upy/tpl/"
};

/**
 * configAll.dir ====> resources/upy
 * destJs =====> web/static/dist/upy
 * config.filename =====> upy
 */

gulp.task('compress-upy-step7', function() {
    return gulp.src(configAll.src.tpl) // resources/upy/「core/bench」/template/* ===> web/static/dist/upy/js/upy-all.tpl.min.js
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

gulp.task('compress-upy-all',['compress-upy-step7'], function() {
    // gulp.src(configAll.src.all)
    //     .pipe(changed(config.name, {extension: 'js'}))
    //     .pipe(concat(config.filename + '-all.min.js'))
    //     .pipe(gulp.dest(destJs));
});

gulp.task('compress-upy-css', function () {
    gulp.src([configAll.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('compress-upy', function () {
    console.log('running compress-upy  ==========================================  ');
    // gulp.start('compress-upy-css');
    gulp.start('compress-upy-all');
});

gulp.task('help', function () {
    console.log('gulp build                  文件打包');
    console.log('gulp help                   参数说明');
});

gulp.task('default', function () {
    gulp.start('help');
});