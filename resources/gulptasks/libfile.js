/*
 * 打包lib库文件
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
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin'); 
var stripDebug = require('gulp-strip-debug');
var config = require('./config.js').libfile;

gulp.task('compress-lib', function() {  
    gulp.src(config.src.js)
        .pipe(changed(config.name, {extension: 'js'}))
        .pipe(concat(config.filename + '.js'))
        .pipe(gulp.dest(config.dest + '/js')) 
        .pipe(ngAnnotate({add: true,remove: true}))
        .pipe(stripDebug())
        .pipe(uglify()) 
        .pipe(concat(config.filename + '.min.js'))  
        .pipe(gulp.dest(config.dest + '/js'));
});


gulp.task('build', function() {
	gulp.start('compress-lib');
});  

//说明
gulp.task('help',function () {
  	console.log('	gulp minifyCSS			    CSS打包');
    console.log('	gulp minifyLIB			    LIB打包');
    console.log('	gulp minifyAdminJS			Admin-JS打包');
  	console.log('	gulp minifyManageJS			Manage-JS打包');
    console.log('	gulp build			        文件打包');
    console.log('	gulp help			          参数说明');
});

/* 默认 */
gulp.task('default',function () {
    gulp.start('help');
});