var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    artoo = require('./index.js');

// Dev example
gulp.task('dev', function() {
  return artoo.blank('artoo.dev.min.js')
    .pipe(artoo({
      url: '//localhost:8000/build/artoo.concat.js',
      random: true,
      loadingText: null,
      settings: {
        log: {
          enabled: true
        }
      }
    }))
    .pipe(gulp.dest('./output'));
});

// Prod example
gulp.task('prod', function() {
  return gulp.src('./test/resources/dummy-script.js')
    .pipe(concat('artoo.prod.min.js'))
    .pipe(uglify())
    .pipe(artoo())
    .pipe(gulp.dest('./output'));
});

// Multi files example
gulp.task('multi', function() {
  return gulp.src(['./test/resources/dummy-script1.js',
                   './test/resources/dummy-script2.js'])
    .pipe(concat('artoo.multi.min.js'))
    .pipe(uglify())
    .pipe(artoo())
    .pipe(gulp.dest('./output'));
});

// Version testing
gulp.task('version', function() {
  return artoo.blank('artoo.version.min.js')
    .pipe(artoo({
      version: '0.0.2',
      settings: {
        instructions: {
          autoRecord: false
        }
      }
    }))
    .pipe(gulp.dest('./output'));
});

// Templates
gulp.task('templates', function() {
  return gulp.src('./test/resources/*.handlebars')
    .pipe(artoo.template())
    .pipe(gulp.dest('./output'));
});

// Stylesheets
gulp.task('stylesheets', function() {
  return gulp.src('./test/resources/*.css')
    .pipe(artoo.stylesheet())
    .pipe(gulp.dest('./output'));
});

// HTML Entities
gulp.task('html', function() {
  return gulp.src(['./test/resources/dummy-script1.js',
                   './test/resources/dummy-script2.js'])
    .pipe(concat('artoo.html.min.js'))
    .pipe(uglify())
    .pipe(artoo({html: true}))
    .pipe(gulp.dest('./output'));
});

// Registering default task
gulp.task('default', ['dev', 'prod', 'multi', 'version', 'templates', 'stylesheets', 'html']);
