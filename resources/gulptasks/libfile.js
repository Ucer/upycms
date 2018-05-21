/**
 * 打包lib库文件
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
var ngAnnotate = require('gulp-ng-annotate');
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


gulp.task('compress-libfile', function() {
    console.log('running compress-libfile  ==========================================  ');
	gulp.start('compress-lib');
});  
