const { src, dest, watch, series } = require('gulp');
const concatCSS = require('gulp-concat-css');
const minifyJS = require('gulp-minify'); 
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Bundle CSS
function bundleCSS() {
  return src([
    './css/required.css',
    './css/**/**.css',
  ])
    .pipe(concatCSS('style.css', {
      inlineImports: false,
    }))
    .pipe(dest('./dist'));
}

// Minify CSS
function minCSS() {
  return src([
    './dist/style.css',
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./dist')); 
}
     

// Minify JS
function minJS() {
  return src('./js/main.js')
  .pipe(minifyJS({
    noSource: true,
    ext:{
      min:'.min.js'
    },
    ignoreFiles: ['-min.js, .min.js'],
  }))
  .pipe(dest('./js'));
}

// Exports
exports.default = series(minJS,bundleCSS,minCSS);
exports.watch = function() { 
  watch(['css/**/**.css'],series(bundleCSS,minCSS));
  watch(['./js/main.js'], minJS);
}
