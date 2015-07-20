var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var using = require('gulp-using')
var sass = require('gulp-sass')
var bowerFiles = require('main-bower-files')
var angularFilesort = require('gulp-angular-filesort');
var minifyHTML = require('gulp-minify-html')
var gulpif = require('gulp-if')
var minimist = require('minimist');
var del = require('del')

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

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

gulp.task('clean', function(cb) {
  del([
    'dist/'
  ], cb)
})
gulp.task('html', ['clean'], function() {
	return gulp.src(paths.html)
	.pipe(gulpif(options.env === 'development', using()))
	.pipe(gulpif(options.env === 'production', minifyHTML({empty:true})))
	.pipe(gulp.dest('dist'))
})
gulp.task('sass', ['clean'], function() {
	return gulp.src(paths.sass)
  .pipe(gulpif(options.env === 'development', using()))
	.pipe(gulpif(options.env === 'production', sass({outputStyle: 'compressed'})))
  .pipe(gulpif(options.env === 'development', sass()))
	.pipe(gulp.dest('dist/css'))
})
gulp.task('img', ['clean'], function() {
	return gulp.src(paths.img)
  .pipe(gulpif(options.env === 'development', using()))
	.pipe(gulp.dest('dist/img'))
})
gulp.task('vendor', ['clean'], function() {
	return gulp.src(bowerFiles())
	.pipe(gulpif(options.env === 'development', using()))
	.pipe(concat('lib.js'))
	.pipe(gulpif(options.env === 'production', uglify()))
	.pipe(gulp.dest('dist'));
})
gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
  	.pipe(angularFilesort())
  	.pipe(gulpif(options.env === 'development', using()))
  	.pipe(concat('app.js'))
    .pipe(gulpif(options.env === 'production', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('all', ['html','sass','img','vendor','scripts'])
gulp.task('default', ['all']);

gulp.task('watch', function() {
  var all = paths.html.concat(paths.sass).concat(paths.img).concat(paths.scripts)
  gulp.watch(all, ['all']);
});