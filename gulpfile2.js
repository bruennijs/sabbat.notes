var gulp = require("gulp");
var print = require("gulp-print")
var console = require("console")
var connect = require("gulp-connect")
var watch = require("gulp-watch")

var srcDirsUi = ['sabbat.notes.ui/*.html', 'sabbat.notes.ui/css/*.css'];
var srcDirsScripts = ['sabbat.notes.ui/scripts/*.js'];

gulp.task('serve', function() {
    console.info('serve started...');

    stream = gulp.src(srcDirsUi)
        .pipe(print())
        .pipe(connect.server(
            {
                port:8000,
                livereload: true,
            }));
});

gulp.task('livereload', function() {
    gulp.src(srcDirsUi.concat(srcDirsScripts))
        .pipe(print())
        .pipe(watch())
        .pipe(print())
        .pipe(connect.reload())
})

gulp.task('typescript', function() {
    console.info("compile changes");
})

gulp.task('watch', function() {
    gulp.watch(srcDirsScripts, ['typescript']);
})

gulp.task('stop', function() {
    webserver.reload;
})

gulp.task('default', ['serve', 'watch', 'livereload']);