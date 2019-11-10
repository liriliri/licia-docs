const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')

function js() {
  return gulp
    .src(['dist/**/*.js', '!dist/demo/*.js'])
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
