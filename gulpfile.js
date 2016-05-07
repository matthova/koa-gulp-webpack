var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var through = require('through2');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('default', function() {
  return gulp.src(['./src/app.js'])
    .pipe(named())
    .pipe(webpack({
      devtool: 'eval',
      node: {
        fs: "empty"
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(through.obj(function (file, enc, cb) {
      // Dont pipe through any source map files as it will be handled
      // by gulp-sourcemaps
      var isSourceMap = /\.map$/.test(file.path);
      if (!isSourceMap) this.push(file);
      cb();
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});
