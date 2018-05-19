/*
 * 打包admin文件
 * 安装nodejs npm gulp和gulp相关插件
 */

'use strict';


// var path = require('path');
var gulp = require('gulp');
var debug = require('gulp-debug');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');  
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minifycss = require('gulp-clean-css');
var htmlmin = require("gulp-htmlmin");
var flatten = require('gulp-flatten');
var config = require('./config.js').admin;

gulp.task('compress-admin-login', function () {
    gulp.src(['src/admin/login/*/*.*', 'src/admin/login/*/*/*.*'])
        .pipe(gulp.dest(config.dist + '/login'));
});

gulp.task('compress-admin-html', function() {
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
    gulp.src(config.src.tpl)
        .pipe(gulp.dest(config.dist + '/tpl'));
});

gulp.task('compress-admin-css', function() {  
    gulp.src(config.src.img)
        .pipe(gulp.dest(config.dist + '/img'));

    gulp.src(config.src.css)
        .pipe(concat(config.filename + '.css'))
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(minifycss())
        .pipe(concat(config.filename + '.min.css'))
        .pipe(gulp.dest(config.dist + '/css'));

    gulp.src([config.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(config.dist + '/css'));

    gulp.src([config.dir + '/css/file.css'])
        .pipe(concat('file.css'))
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(minifycss())
        .pipe(concat('file.min.css'))
        .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('compress-admin-js', function() {  
    gulp.src(config.src.js)
        .pipe(changed(config.name + '/js', {extension: 'js'}))
        .pipe(concat(config.filename + '.js'))
        .pipe(gulp.dest(config.dist + '/js'))
});


gulp.task('build', function() {
    gulp.start('compress-admin-css');
	gulp.start('compress-admin-js');
});  

