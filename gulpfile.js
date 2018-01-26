/**
 * Created by danihbelan on 22/12/2017.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber'); // Hace que watch no crashee al encontrar un error
var pkg = require('./package.json');

gulp.task('page', function () {
  gulp.src('./src/app/page/**')
    //.pipe(plumber())
    //.pipe(concat('app.min.js'))
    //.pipe(uglify())
    //.pipe(plumber.stop())
    .pipe(gulp.dest('./public/admin/app'))
});

gulp.task('app', function () {
  gulp.src('./src/app/app.js')
  //.pipe(plumber())
  //.pipe(concat('app.min.js'))
  //.pipe(uglify())
  //.pipe(plumber.stop())
    .pipe(gulp.dest('./public/admin/app'))
});

gulp.task('auth', function () {
  gulp.src('./src/app/auth/**')
  //.pipe(plumber())
  //.pipe(concat('app.min.js'))
  //.pipe(uglify())
  //.pipe(plumber.stop())
    .pipe(gulp.dest('./public/auth'))
});

gulp.task('all', ['page','app','auth']);


gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['all']);
});