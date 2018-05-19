
/**
 *
 * @author Ucer - Hong Jie Zhang <ucer183@163.com>
 * @copyright (c) 2018, jiayouhaoshi.com
 *
 */

'use strict';

var gulp = require('gulp');
var config = require('./config.js').admin;

gulp.task('compress-admin-login', function () {
    gulp.src(['resources/admin/login/*/*.*', 'resources/admin/login/*/*/*.*'])
        .pipe(gulp.dest(config.dest + '/login'));
});


gulp.task('compress-admin', function() {
    console.log('running compress-admin ... ');
    gulp.start('compress-admin-login');
});

