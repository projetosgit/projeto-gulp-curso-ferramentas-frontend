const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();


function sass(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpsass())
        .pipe(gulp.dest('./src/css'))
}

function js(){
    return gulp.src([
            './src/js/getStudents.js',
            './src/js/getMedia.js',
            './src/js/getRandomNumber.js',
            './src/js/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./src/js'))
}

exports.default = js
