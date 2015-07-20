var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var using = require('gulp-using')

var bowerFiles = require('main-bower-files')
var angularFilesort = require('gulp-angular-filesort');

var paths = {
  scripts: [
  'app/**/*.js',
  '!app/bower_components/**/*.js'
  ]
};

gulp.task('vendor', function() {
	return gulp.src(bowerFiles())
	.pipe(using())
	.pipe(concat('lib.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
})
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
  	.pipe(angularFilesort())
  	.pipe(using())
  	.pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['vendor','scripts']);