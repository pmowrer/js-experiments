var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Based on recipe:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/server-with-livereload-and-css-injection.md
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['index.html', 'assets/css/**/*.css', 'app/**/*.js'], {}, reload);
});
