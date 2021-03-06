var gulp        = require('gulp'),
clean       = require('gulp-clean'),
concat      = require('gulp-concat'),
postcss     = require('gulp-postcss'),
cssnext     = require('postcss-cssnext'),
plumber     = require('gulp-plumber'),
precss      = require('precss'),
nano        = require('gulp-cssnano'),
notify      = require('gulp-notify'),
uglify      = require('gulp-uglify'),
runSequence = require('run-sequence');

var browserSync = require('browser-sync').create();

var dist_dir    = './dist/',
src_dir     = './src/'
css_src     = src_dir  + 'css/main.css',
css_dist    = dist_dir + 'css/',
js_src      = src_dir  + 'js/main.js',
js_dist     = dist_dir + 'js/',
fonts_src   = src_dir  + 'fonts/*.*',
fonts_dist  = dist_dir + 'fonts/',
images_src  = src_dir  + 'images/*.*';
images_dist = dist_dir + 'images/';

// Clean
gulp.task('clean', function() {
  return gulp.src(['./dist/*'], {read: false})
  .pipe(clean());
});

// Create base dist
gulp.task('copyfonts', function() {
  gulp.src(fonts_src)
  .pipe(gulp.dest(fonts_dist));
});
gulp.task('copyimages', function() {
  gulp.src(images_src)
  .pipe(gulp.dest(images_dist));
});
gulp.task('copyindex', function() {
  gulp.src('./src/index.html')
  // Perform minification tasks, etc here
  .pipe(gulp.dest(dist_dir));
});

//css
gulp.task('css', function() {
  var processors = [
    cssnext,
    precss
  ];
  return gulp.src(css_src)
  .pipe(postcss(processors))
  .pipe(gulp.dest(css_dist))
  .pipe(notify({ message: 'css task complete' }));
});

//css
//TO-DO: Use environment variables to run production tasks
gulp.task('css-pro', function() {
  var processors = [
    cssnext,
    precss
  ];
  var configNano = {
    autoprefixer: { browsers: 'last 2 versions' },
    discardComments: { removeAll: true },
    safe: true
  };
  return gulp.src(css_src)
  .pipe(postcss(processors))
  .pipe(gulp.dest(css_dist))
  .pipe(plumber())
  .pipe(nano(configNano))
  .pipe(gulp.dest(css_dist))
  .pipe( browserSync.stream() )
  .pipe(notify({ message: 'css task complete' }));
});

// Scripts
gulp.task('js', function() {
  return gulp.src(js_src)
  .pipe(concat('main.js'))
  .pipe(gulp.dest(js_dist))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Scripts
//TO-DO: Use environment variables to run production tasks
gulp.task('js-pro', function() {
  return gulp.src(js_src)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(js_dist))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// create a task that ensures the `css` task is complete before
// reloading browsers
gulp.task('css-watch', ['css'], function (done) {
  browserSync.reload();
  done();
});

// Static server
gulp.task('serve', ['css'], function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: dist_dir
    },
    browser: "google chrome"
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("./css/*.css", ['css-watch']);
});

// Watch
gulp.task('watch', function() {
  // Watch .css files
  gulp.watch('src/**/*.css', ['css']);

});

gulp.task('copy', ['clean'], function() {
  gulp.run('copyfonts', 'copyimages', 'copyindex');
});

// Default
gulp.task('dist', function() {
  runSequence(['copy','css','js']);
});

// Default
gulp.task('default', function() {
  runSequence(['dist', 'serve', 'watch']);
});

gulp.task('build-pro', function() {
  runSequence(['copy', 'css-pro', 'js-pro']);
});
