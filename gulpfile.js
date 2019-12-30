const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();


function sass(){

    const path = isProd ? './dist/css' : './src/css'

    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpsass())
        .pipe(gulp.dest(path))
}

function js(){

    const files = [
        './node_modules/babel-polyfill/dist/polyfill.js',
        './src/js/getStudents.js',
        './src/js/getMedia.js',
        './src/js/getRandomNumber.js',
        './src/js/app.js'
    ]

    if(isProd) {
        return gulp.src(files)
            .pipe(concat('app.min.js'))
            .pipe(babel({
                "presets": [
                    ["env", {
                        "targets": {
                            "browsers": [">1%", "last 2 versions"]
                        }
                    }]
                ]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
    } 

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/js'))
}

function server(){
    browsersync.init({
        server: './src/'
    })

    gulp.watch(['./src/js/**/*.js', '!./src/js/**/*.min.js'], js)
        .on('change', browsersync.reload)

    gulp.watch('./src/**/*.html').on('change', browsersync.reload)

    gulp.watch('./src/scss/**/*.scss', sass).on('change', browsersync.reload)
}

let isProd = false;
function prod(cb){
    isProd = true
    cb()
}
function dev(cb){
    isProd = false
    cb()
}

function html(){
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
}

function clear(){
    return del('./dist')
}

exports.default = gulp.series(dev, clear, gulp.parallel(html, js, sass), server)

exports.build = gulp.series(prod, clear, gulp.parallel(html, js, sass))
