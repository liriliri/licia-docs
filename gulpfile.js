const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

function js() {
  return gulp
    .src(['dist/**/*.js', '!dist/demo/*.js'])
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
}

function html() {
  return gulp
    .src('dist/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true
      })
    )
    .pipe(gulp.dest('dist'))
}

exports.default = gulp.series(js, html)
