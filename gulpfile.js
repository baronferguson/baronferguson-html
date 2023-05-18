const { src, dest, watch, series } = require('gulp');
const concatCSS = require('gulp-concat-css');
const minifyJS = require('gulp-minify'); 
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Bundle CSS
const bundleCSS = async () => {
  src([
    './css/required.css',
    './css/**/**.css',
  ])
    .pipe(concatCSS('style.css', {
      inlineImports: false,

    }))
    .pipe(dest('./dist'));
}

// Minify CSS
const minCSS = async () =>
  src([
    './dist/style.css',
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./dist'));    

// Minify JS
const minJS = () => 
  src('js/main.js')
    .pipe(minifyJS({
      noSource: true,
      ext:{
        min:'.min.js'
      },
      ignoreFiles: ['-min.js, .min.js'],
    }))
    
    .pipe(dest('./js'));

const minAll = series(minCSS, minJS)

// Exports
exports.css = bundleCSS; // Run First
exports.minAll = minAll;
exports.minCSS = minCSS; 
exports.minJS = minJS;