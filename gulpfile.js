'use strict';

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var config = {
  dist: './dist',
  browserifyEntry: './src/main.js',
  jsSources: ['./src/**/*.js'],
  sourceFileName: 'master.js',
  styleSources: ['./src/styles/*.scss']
};

//Clean
gulp.task('clean', function() {
  del(config.dist);
});

//Browserify
gulp.task('browserify', function() {
  browserify(config.browserifyEntry)
    .transform(reactify)
    .transform(babelify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source(config.sourceFileName))
    .pipe(gulp.dest(config.dist));
});

//Sass
gulp.task('sass', function() {
  gulp.src(config.styleSources)
    .pipe(sass())
    .on('error', console.error.bind(console))
    .pipe(concat('master.css'))
    .pipe(gulp.dest(config.dist));
});

//Watch
gulp.task('watch', function () {
  gulp.watch(config.jsSources, ['browserify']);
  gulp.watch(config.styleSources, ['sass']);
});

//Default
gulp.task('default', ['clean', 'sass', 'browserify', 'watch']);
