/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minifycss = require('gulp-clean-css');
var htmlmin = require("gulp-htmlmin");
var flatten = require('gulp-flatten');
var adminConfig = require('./config.js').admin;

gulp.task('compress-admin-css', function () {
    gulp.src(adminConfig.src.img)
        .pipe(gulp.dest(adminConfig.dest + '/img'));

    gulp.src(adminConfig.src.css)
        .pipe(concat(adminConfig.filename + '.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat(adminConfig.filename + '.min.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'));

    gulp.src([adminConfig.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'));

    gulp.src([adminConfig.dir + '/css/file.css'])
        .pipe(concat('file.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('file.min.css'))
        .pipe(gulp.dest(adminConfig.dest + '/css'));
});

gulp.task('compress-admin-js', function () {
    gulp.src(adminConfig.src.js)
        .pipe(changed(adminConfig.name + '/js', {extension: 'js'}))
        .pipe(concat(adminConfig.filename + '.js'))
        .pipe(gulp.dest(adminConfig.dest + '/js'))
});


gulp.task('compress-admin-html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(adminConfig.src.tpl)
        .pipe(gulp.dest(adminConfig.dest + '/tpl'));
});


gulp.task('compress-admin-login', function () {
    gulp.src(['resources/admin/login/*/*.*', 'resources/admin/login/*/*/*.*'])
        .pipe(gulp.dest(adminConfig.dest + '/login'));
});

gulp.task('compress-admin', function () {
    console.log('running compress-admin ========================================== ');
    gulp.start('compress-admin-css');
    gulp.start('compress-admin-js');
    gulp.start('compress-admin-html');
    gulp.start('compress-admin-login');
});

