/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-clean-css');
var config = require('./config.js').upy;
var configAll = require('./config.js').upyall;


gulp.task('compress-upy-css', function() {
    gulp.src([configAll.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('compress-upy', function() {
    console.log('running compress-upy ... ');
    gulp.start('compress-upy-css');
});  

gulp.task('help',function () {
    console.log('gulp build                  文件打包');
    console.log('gulp help                   参数说明');
});

gulp.task('default',function () {
    gulp.start('help');
});