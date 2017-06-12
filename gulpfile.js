//////////////////////////////////////////
//Dependencies////////////////////////////
//////////////////////////////////////////

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoPrefixer = require('gulp-autoprefixer');

//Image Compression
var imagemin = require('gulp-imagemin');
var imageminPNGQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

//////////////////////////////////////////
//File Paths//////////////////////////////
//////////////////////////////////////////

var SCRIPTS_PATH = './public/**/*.js';
var CSS_PATH = './public/**/*.css';
var IMAGES_PATH = './public/**/*.{png,jpg,jpeg,svg.gif}'
//////////////////////////////////////////
//Styles//////////////////////////////////
//////////////////////////////////////////

gulp.task('styles', function(){
    return gulp.src(CSS_PATH)
    .pipe(autoPrefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/dist'));
});

//////////////////////////////////////////
//Scripts/////////////////////////////////
//////////////////////////////////////////

gulp.task('scripts', function() {
    console.log("Starting scripts task!");
    
    return gulp.src(SCRIPTS_PATH)
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public/dist/scripts'));
});

//////////////////////////////////////////
//Images//////////////////////////////////
//////////////////////////////////////////

gulp.task('images', function() {
    console.log("Starting images task!");
    return gulp.src(IMAGES_PATH)
    .pipe(imagemin(
        [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imageminPNGQuant(),
            imageminJpegRecompress()
        ]
    ))
    .pipe(gulp.dest('public/dist/'));
});

//////////////////////////////////////////
//Default/////////////////////////////////
//////////////////////////////////////////

gulp.task('default', function() {
    console.log("Starting default task!");
});

//////////////////////////////////////////
//Gulp Watch//////////////////////////////
//////////////////////////////////////////

gulp.task('watch', function() {
    console.log("Starting watch task!");
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
});