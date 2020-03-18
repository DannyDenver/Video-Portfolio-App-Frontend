var purify = require('gulp-purifycss');
var gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');


gulp.task('uncss', function() {
  return gulp.src('./bootstrap.min.css')
    .pipe(purify(['./dist/video-portfolio-app/scripts.js',
    './dist/video-portfolio-app/scripts-es5.js',
    './dist/video-portfolio-app/scripts-2015.js',
    './dist/video-portfolio-app/vendor-es5.js',
    './dist/video-portfolio-app/vendor-es2015.js',
    './src/*/*/*/*.html', './src/*/*/*.html', './src/*/*.html', './src/*.html']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./bootstrap-purified'));
});


gulp.task('uncss', gulp.series('uncss'));
