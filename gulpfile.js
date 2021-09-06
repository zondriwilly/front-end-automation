const { parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug-3');
const path = {
    src: {
        scss: 'src/scss/*.scss',
        html: 'src/*.pug'
    },
    dist: {
        css: 'dist/css',
        html: 'dist'
    }
};

gulp.task('scssToCss', async() => {
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist.css))
})

gulp.task('pugToHtml', async() => {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist.html))
})

gulp.task('listener', () => {
    gulp.watch('src/*.pug', parallel('pugToHtml'));
    gulp.watch('src/scss/*.scss', parallel('scssToCss'));
})