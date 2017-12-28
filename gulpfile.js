/**
 * Created by danihbelan on 22/12/2017.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber'); // Hace que watch no crashee al encontrar un error
var pkg = require('./package.json');

gulp.task('user', function () {
	gulp.src('./src/controllers/user/**/*.js')
		.pipe(plumber())
		.pipe(concat('user.min.js'))
		//.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('general', function () {
	gulp.src('./src/controllers/general/**/*.js')
		.pipe(plumber())
		.pipe(concat('general.min.js'))
		//.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('login', function () {
	gulp.src('./src/controllers/login/**/*.js')
		.pipe(plumber())
		.pipe(concat('login.min.js'))
		//.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('routesJS', function () {
	gulp.src('./src/controllers/main/**/*.js')
		.pipe(plumber())
		.pipe(concat('routesJS.min.js'))
		//.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('utilFunctions', function () {
	gulp.src('./src/js/utilFunctions.js')
		.pipe(plumber())
		.pipe(concat('utilFunctions.min.js'))
		//.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('all', ['user','general','login', 'routesJS','utilFunctions']);

gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', ['all']);
});