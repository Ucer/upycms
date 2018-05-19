/*
 * 打包static文件
 * 安装nodejs npm gulp和gulp相关插件
 */

'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('resources/gulptasks');


gulp.task('build', function() {
    gulp.start('compress-upy');
    gulp.start('compress-admin-css');
});


//说明
gulp.task('help',function () {
  	console.log('gulp compress-lib			    CSS打包');
    console.log('gulp compress-lib			    LIB打包');
    console.log('gulp compress-admin-login		Admin-login打包');
  	console.log('gulp compress-admin-html		Admin-html打包');
    console.log('gulp compress-admin-css        Admin-css打包');
    console.log('gulp compress-admin-js         Admin-js打包');
    console.log('gulp build			            文件打包');
    console.log('gulp help			            参数说明');
});


/* 默认 */
gulp.task('default',function () {
    gulp.start('help');
});