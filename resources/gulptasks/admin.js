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
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin'); 
var stripDebug = require('gulp-strip-debug');
var flatten = require('gulp-flatten');
var config = require('./config.js').admin;

gulp.task('compress-admin-login', function () {
    gulp.src(['src/admin/login/*/*.*', 'src/admin/login/*/*/*.*'])
        .pipe(gulp.dest(config.dest + '/login'));
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
        // .pipe(htmlmin(options))
        .pipe(gulp.dest(config.dest + '/tpl'));
    // var html2jsOptions = {
    //     moduleName: function(file){
    //         var filepath = file.path.replace(/\\/g, "/");
    //         var pathList = filepath.split('/');
    //         var folder = pathList[pathList.length - 2];
    //         var filename = pathList[pathList.length - 1];
    //         var filename = filename.replace(/\.tpl\.html|\.html|\.tpl/g, "");
    //         // var folderList = folder.split('.');
    //         // folderList[0] = folderList[0].toUpperCase();
    //         // var modname = folderList.join('.');
    //         console.log('WPG.' + folder + '.' + filename);
    //         return 'WPG.' + folder + '.' + filename;
    //     },
    //     prefix: "wpg/tpl/"
    // };
    // gulp.src(config.src.tpl)
    //     .pipe(debug({title: 'file:'}))
    //     .pipe(changed(config.name + '-tpl', {extension: 'html'}))
    //     .pipe(htmlmin())
    //     .pipe(ngHtml2Js(html2jsOptions))
    //     .pipe(concat(config.filename + ".tpl.js"))
    //     .pipe(gulp.dest(config.dest));
    // gulp.src(config.src.tpl)
    //     .pipe(debug({title: 'file:'}))
    //     .pipe(changed(config.name + '-tpl', {extension: 'html'}))
    //     .pipe(htmlmin({
    //             collapseWhitespace: true
    //         }))
    //     .pipe(ngHtml2Js(html2jsOptions))
    //     .pipe(concat(config.filename + ".tpl.tmp.js"))
    //     .pipe(uglify({
    //             mangle: true,//类型：Boolean 默认：true 是否修改变量名
    //             compress: true,//类型：Boolean 默认：true 是否完全压缩
    //         }))
    //     .pipe(concat(config.filename + ".tpl.min.js"))
    //     .pipe(gulp.dest(config.dest + '/js'));
});

gulp.task('compress-admin-css', function() {  
    gulp.src(config.src.img)
        .pipe(gulp.dest(config.dest + '/img'));

    gulp.src(config.src.css)
        .pipe(concat(config.filename + '.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat(config.filename + '.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));

    gulp.src([config.dir + '/css/login.css'])
        .pipe(concat('login.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('login.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));

    gulp.src([config.dir + '/css/file.css'])
        .pipe(concat('file.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(minifycss())
        .pipe(concat('file.min.css'))
        .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('compress-admin-js', function() {  
    gulp.src(config.src.js)
        .pipe(changed(config.name + '/js', {extension: 'js'}))
        .pipe(concat(config.filename + '.js'))
        .pipe(gulp.dest(config.dest + '/js'))
        // .pipe(ngmin({dynamic: false}))
        // .pipe(ngAnnotate({add: true,remove: true}))
        // .pipe(stripDebug())
        // .pipe(uglify({
        //         mangle: true,//类型：Boolean 默认：true 是否修改变量名
        //         compress: true,//类型：Boolean 默认：true 是否完全压缩
        //     }))
        // .pipe(concat(config.filename + '.min.js'))  
        // .pipe(gulp.dest(config.dest + '/js'));
});  


gulp.task('build', function() {
    gulp.start('compress-admin-css');
	gulp.start('compress-admin-js');
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