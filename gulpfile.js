'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpCopy = require('gulp-copy');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');


//task convert scss to css
gulp.task('sass', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
})
gulp.task('sass:watch', function () {
    gulp.watch('./src/css/*.scss', ['sass']);
})

//Task copy assets
gulp.task('asset-html', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./app'))
})

gulp.task('asset-img', function () {
    return gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./app/img'))
})

gulp.task('asset-lib-css', function () {
    return gulp.src('./src/css/lib/*.css')
        .pipe(gulp.dest('./app/css'))
})

gulp.task('asset-lib-js', function () {
    return gulp.src('./src/js/vendor/*.js')
        .pipe(gulp.dest('./app/vendor'))
})

gulp.task('asset-fonts', function () {
    return gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./app/fonts'))
})

gulp.task('assets', ['asset-html','asset-img', 'asset-fonts', 'asset-lib-css', 'asset-lib-js'])

//task bundle app
gulp.task('bundle', function() {
    // Single entry point to browserify 
    gulp.src('./src/js/index.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app/js'))
});

//build project
gulp.task('build', [
        'assets', 
        'sass', 
        'bundle'
    ])

gulp.task('default', ['build'])

