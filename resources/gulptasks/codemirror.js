/*
 * 打包codemirror库文件
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

gulp.task('compress-codemirror-css', function() {  
    gulp.src(['libs/codemirror/5.27.2/lib/codemirror.css',
              'libs/codemirror/5.27.2/addon/hint/show-hint.css',
              'libs/codemirror/5.27.2/addon/dialog/dialog.css',
              'libs/codemirror/5.27.2/addon/search/matchesonscrollbar.css',
            ])
        .pipe(changed('codemirror_css', {extension: 'css'}))
        .pipe(concat('codemirrorAll.css'))
        .pipe(gulp.dest('libs/codemirror/css')) 
        .pipe(minifycss())
        .pipe(concat('codemirrorAll.min.css'))  
        .pipe(gulp.dest('libs/codemirror/css'));
});

gulp.task('compress-codemirror-lib', function() {  
    gulp.src(['libs/codemirror/5.27.2/lib/codemirror.js'])
        .pipe(changed('codemirror_lib', {extension: 'js'}))
        .pipe(concat('codemirror.js'))
        .pipe(gulp.dest('libs/codemirror/js')) 
        .pipe(stripDebug())
        .pipe(uglify()) 
        .pipe(concat('codemirror.min.js'))  
        .pipe(gulp.dest('libs/codemirror/js'));
});

gulp.task('compress-codemirror-addon', function() {  
    gulp.src(['libs/codemirror/5.27.2/addon/edit/*.js',
              'libs/codemirror/5.27.2/addon/dialog/dialog.js',
              'libs/codemirror/5.27.2/addon/search/search.js',
              'libs/codemirror/5.27.2/addon/scroll/annotatescrollbar.js',
            ])
        .pipe(changed('codemirror_addon', {extension: 'js'}))
        .pipe(concat('addonAll.js'))
        .pipe(gulp.dest('libs/codemirror/js')) 
        // .pipe(ngAnnotate({add: true,remove: true}))
        .pipe(stripDebug())
        .pipe(uglify()) 
        .pipe(concat('addonAll.min.js'))  
        .pipe(gulp.dest('libs/codemirror/js'));
});

gulp.task('compress-codemirror-mode', function() {  
    gulp.src(['libs/codemirror/5.27.2/addon/mode/loadmode.js',
              'libs/codemirror/5.27.2/addon/mode/multiplex.js',
              'libs/codemirror/5.27.2/addon/mode/overlay.js',
              'libs/codemirror/5.27.2/addon/mode/simple.js',
              'libs/codemirror/5.27.2/mode/*/*.js',
              'libs/codemirror/5.27.2/mode/meta.js',
            ])
        .pipe(changed('codemirror_mode', {extension: 'js'}))
        .pipe(concat('modeAll.js'))
        .pipe(gulp.dest('libs/codemirror/js'))
        // .pipe(ngAnnotate({add: true,remove: true}))
        .pipe(stripDebug())
        .pipe(uglify()) 
        .pipe(concat('modeAll.min.js'))  
        .pipe(gulp.dest('libs/codemirror/js'));
});


gulp.task('compress-codemirror', function() {
    gulp.start('compress-codemirror-css');
    gulp.start('compress-codemirror-lib');
	  gulp.start('compress-codemirror-mode');
    gulp.start('compress-codemirror-addon');
});  

