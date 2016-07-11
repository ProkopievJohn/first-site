var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    prefix = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    rename = require('gulp-rename'),
    wiredep = require('wiredep').stream,
    server = require('gulp-server-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jade = require('gulp-jade'),
    prettify = require('gulp-html-prettify'),
    stylus = require('gulp-stylus'),
    complexity = require('gulp-complexity'),
    autopolyfiller = require('gulp-autopolyfiller');

// IMAGE-MIN
gulp.task('img', function () {
  gulp.src('app/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
});

//BOWER
gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('app'));
});

// JADE
gulp.task('jade', function () {
  gulp.src('app/jade/index.jade')
    .pipe(jade())
    .pipe(prettify({indent_char: ' ', indent_size: 1}))
    .pipe(gulp.dest('app'))
});

// STYLUS
gulp.task('styl', function() {
  gulp.src('app/styl/*.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(concat('style.styl.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(csscomb())
    .pipe(cssMin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

// JAVASCRIPT
gulp.task('js', function () {
  gulp.src('app/myjs/*.js')
  // gulp.src('app/myjs/Slider.js')
    .pipe(concat('all.min.js'))
    .pipe(jshint())
    // .pipe(complexity())
    // .pipe(autopolyfiller('result_polyfill_file.js', {
    //     browsers: ['last 4 version', '> 1%', 'ie 9']
    // }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//SERVER
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      // directoryListing: true,
      open: true
    }));
});

// BUILD
gulp.task('build', function () {
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssMin()))
    // .pipe(uncss({
    //         html: ['dist/*.html']
    //     }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('app/*.jade',['jade']);
  gulp.watch('app/myjs/*.js',['js']);
  gulp.watch('app/styl/*.styl',['styl']);
});

gulp.task('default', ['watch', 'jade', 'js', 'img', 'styl', 'webserver']);