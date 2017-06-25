const gulp = require('gulp'),
	  runSequence = require('run-sequence'),
	  concat = require('gulp-concat'),
	  clean = require('gulp-clean'),
      cleanCSS = require('gulp-clean-css');

//concatinate css
gulp.task('remove-css-bundle', function () {
  return gulp.src('public/css/bundle.css', {read: false})
    .pipe(clean());
});

gulp.task('concatCSS', function() {
  return gulp.src('public/css/**/*.css')
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minifyCSS', function() {
  return gulp.src('public/css/bundle.css')
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: false }))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('css-handle', function(done) {
    runSequence('remove-css-bundle', 'concatCSS', 'minifyCSS', function() {
        done();
    });
});


let projectSource = [
    'public/js/**/*.js',
	'public/css/**/*.css',
	'!public/css/bundle.css',
	'public/**/*.html'
];

gulp.task('backup', function() {
  gulp.src(projectSource,  { base: './' })
    .pipe(gulp.dest('public/backup'))
});


gulp.task('build', function(done){
	 runSequence(
	  'backup',
	  'css-handle', 
	  function() {
        done();
    });
});

gulp.task('default', ['build']);
