var gulp = require('gulp'),
    path = require('path'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./assets/css/index.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./assets/css/'));
});

// Based on recipe:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/server-with-livereload-and-css-injection.md
gulp.task('serve', ['compile'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./assets/css/**/*.less', ['compile']);
    gulp.watch(['index.html', 'assets/css/**/*.css', 'app/**/*.js'], {}, reload);
});

gulp.task('compile', ['less']);
