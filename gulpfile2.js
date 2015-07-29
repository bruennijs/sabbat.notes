var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var connect = require("gulp-connect");
var watch = require("gulp-watch");

var srcDirsUi = ['sabbat.notes.ui/*.html', 'sabbat.notes.ui/css/*.css', 'sabbat.notes.ui/scripts/*.js'];

gulp.task('serve', function() {
    console.info('serve started...');
    connect.server(
        {
            root:'sabbat.notes.ui',
            port:8000,
            livereload: true
        });
});

gulp.task('reload', function () {
    gulp.src(srcDirsUi)
        .pipe(print())
        .pipe(connect.reload());
});

gulp.task('typescript', function() {
    console.info("compile changes");
});

gulp.task('watch', function() {
    gulp.watch(srcDirsUi, ['reload']);
});

gulp.task('default', ['serve', 'watch']);