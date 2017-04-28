'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpCopy = require('gulp-copy')
const browserify = require('gulp-browserify')
const rename = require('gulp-rename')
const gulpFilter = require('gulp-filter')
const mainBowerFiles = require('main-bower-files')
const inject = require('gulp-inject')
const watch = require('gulp-watch')

//task convert scss to css
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
})
gulp.task('sass:watch', function () {
    gulp.watch('./scss/*.scss', ['sass']);
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

gulp.task("bundle:watch", function() {
    watch(['./app/js/*.js', './app/js/*/*.js'], ['bundle']);
});

//build project
gulp.task('build', [
        'sass', 
        'bower'
    ])

gulp.task('default', ['build'])

