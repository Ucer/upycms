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
// var configAll = require('./config.js').upyall;

var destJs = config.dest + '/js';
var html2jsOptions = {
    moduleName: function (file) {
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


gulp.task('compress-upy-core', [
    'compress-upy-step1',
    'compress-upy-step2'
], function () {
    return gulp.src(config.src.stp_one)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-core.min.js'))
        .pipe(gulp.dest(destJs));
});
gulp.task('compress-upy-step1', function () {
    return gulp.src(config.src.dir_coreJs) // resources/upy/core/ 「*,js、controler/*.js、service/*js」 === > /web/static/dist/upy/upy-core.ctr.min.js
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-core-ctr.js'))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true, remove: true}))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(concat(config.filename + '-core.ctr.min.js'))
        .pipe(gulp.dest(destJs));
});
gulp.task('compress-upy-step2', function () {
    return gulp.src(config.src.dir_coreTpl)
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


gulp.task('compress-upy-bench', [
    'compress-upy-step3',
    'compress-upy-step4',
    'compress-upy-step5'
], function () {
    return gulp.src(config.src.stp_two)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-bench.min.js'))
        .pipe(gulp.dest(destJs));
});
gulp.task('compress-upy-step3', function () {
    return gulp.src(config.src.dir_benchJs)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '-bench.ctr.js'))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true, remove: true}))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(concat(config.filename + '-bench.ctr.min.js'))
        .pipe(gulp.dest(destJs));
});
gulp.task('compress-upy-step4', function () {
    return gulp.src(config.src.dir_benchTpl)
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
gulp.task('compress-upy-step5', function () {
    return gulp.src(config.src.dir_config)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.name + '-config.js'))
        .pipe(ngmin({dynamic: false}))
        .pipe(ngAnnotate({add: true, remove: true}))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(concat(config.filename + '-conf.min.js'))
        .pipe(gulp.dest(destJs));
});


gulp.task('compress-upy-all', [
    // 'compress-upy-step6',
    'compress-upy-step7'
], function () {
    // gulp.src(config.all_stp_two)
    //     .pipe(changed(config.name, {extension: 'js'}))
    //     .pipe(concat(config.filename + '-all.min.js'))
    //     .pipe(gulp.dest(destJs));
});
gulp.task('compress-upy-step7', function() {
    return gulp.src(config.all_tpl)
        .pipe(changed(config.name + '-tpl', {extension: 'html'}))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(ngHtml2Js(html2jsOptions))
        .pipe(concat(config.filename + "-all.tpl.tmp.js"))
        // .pipe(uglify({
        //     mangle: true,//类型：Boolean 默认：true 是否修改变量名
        //     compress: true,//类型：Boolean 默认：true 是否完全压缩
        // }))
        // .pipe(concat(config.filename + "-all.tpl.min.js"))
        // .pipe(gulp.dest(destJs));
});


gulp.task('compress-upy', function () {
    console.log('running compress-upy  ==========================================  ');
    // gulp.start('compress-upy-core');
    // gulp.start('compress-upy-bench');
    gulp.start('compress-upy-all');
});

gulp.task('help', function () {
    console.log('gulp build                  文件打包');
    console.log('gulp help                   参数说明');
});

gulp.task('default', function () {
    gulp.start('help');
});