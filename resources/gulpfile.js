/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('gulptasks');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    gulp.start('help');
});

//说明
gulp.task('help',function () {
    console.log('gulp compress-css			    CSS打包');
    console.log('gulp compress-lib			    LIB打包');
    console.log('gulp compress-admin-login		Admin-login打包');
    console.log('gulp compress-admin-html		Admin-html打包');
    console.log('gulp compress-admin-css        Admin-css打包');
    console.log('gulp compress-admin-js         Admin-js打包');
    console.log('gulp build			            文件打包');
    console.log('gulp help			            参数说明');
});