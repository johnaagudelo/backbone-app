'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpCopy = require('gulp-copy');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const gulpFilter = require('gulp-filter');
const mainBowerFiles = require('main-bower-files')
const inject = require('gulp-inject')

//task convert scss to css
gulp.task('sass', function () {
    return gulp.src('./scss/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
})
gulp.task('sass:watch', function () {
    gulp.watch('./src/css/*.scss', ['sass']);
})

//Task copy assets
gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js')
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulp.dest('./app/lib'))
})

//task bundle app
gulp.task('bundle', function() {
    // Single entry point to browserify 
    gulp.src('./app/js/index.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app'))
});

//build project
gulp.task('build', [
        'sass', 
        'bower'
    ])

gulp.task('default', ['build'])

