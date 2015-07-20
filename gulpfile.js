var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var using = require('gulp-using')
var sass = require('gulp-sass')
var bowerFiles = require('main-bower-files')
var angularFilesort = require('gulp-angular-filesort');
var minifyHTML = require('gulp-minify-html')

var paths = {
  html: [
  	'src/**/*.html',
  	'!src/bower_components/**/*.html'
  ],
  sass: [
  	'src/css/*.scss'
  ],
  img: [
  	'src/img/**/*',
  	'!src/img/raw/**/*'
  ],
  scripts: [
  'src/**/*.js',
  '!src/bower_components/**/*.js'
  ]
};

gulp.task('html', function() {
	return gulp.src(paths.html)
	.pipe(using())
	.pipe(minifyHTML({empty:true}))
	.pipe(gulp.dest('dist'))
})
gulp.task('sass', function() {
	return gulp.src(paths.sass)
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('dist/css'))
})
gulp.task('img', function() {
	return gulp.src(paths.img)
	.pipe(gulp.dest('dist/img'))
})
gulp.task('vendor', function() {
	return gulp.src(bowerFiles())
	.pipe(using())
	.pipe(concat('lib.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
})
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
  	.pipe(angularFilesort())
  	.pipe(using())
  	.pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.img, ['img']);
  	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['html','sass','img','vendor','scripts']);