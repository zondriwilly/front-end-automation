const { parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const pug = require('gulp-pug-3');

gulp.task('scssToCss', async () => {
    gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('pugToHtml', async () => {
    gulp.src('src/*.pug')
        .pipe(plumber())
        .pipe(pug({
                doctype: 'html',
                pretty: true
            }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist'))
})

gulp.task('listener', () => {
    gulp.watch('src/*.pug', parallel('pugToHtml'));
    gulp.watch('src/scss/*.scss', parallel('scssToCss'));
})