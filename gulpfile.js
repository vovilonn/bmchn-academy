const { src, dest, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function css() {
    return src('./assets/src/sass/**/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('./assets/dist/css'), { sourcemaps: true })
        .pipe(browserSync.stream());
}

function js() {
    return src('./assets/src/js/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('build.min.js'))
        .pipe(dest('./assets/dist/js', { sourcemaps: true }));
}

function browser() {
    browserSync.init({
        proxy: 'localhost/base',
        files: [
            './**/*.php'
        ]
    });

    watch('./assets/src/sass/**/*.scss', css).on('change', browserSync.reload);
    watch('./assets/src/js/*.js', js).on('change', browserSync.reload);
}

exports.css = css;
exports.js = js;
exports.default = browser;