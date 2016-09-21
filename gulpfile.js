var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpCopy = require('gulp-copy'),
    postcss      = require('gulp-postcss'),
    sass = require('gulp-sass');

 
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('copy', ['clean'], function () {
  return gulp.src('./src/**/*.{html,png,jpg}')
    .pipe(gulpCopy('./dist', {prefix: 1}));
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', ['clean'], function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch', function () {
  gulp.watch(['./src/*.html', './src/sass/**/*.scss'], ['html', 'build']);
});

gulp.task('build', ['clean', 'sass', 'copy']);
 
gulp.task('default', ['connect', 'build', 'watch']);
