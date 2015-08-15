// gulp file

var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var server = require("browser-sync").create("sabbat.notes static server");
var glob = require('glob');

var srcDirsUi = ['sabbat.notes.ui/**/*.html', 'sabbat.notes.ui/**/*.css', 'sabbat.notes.ui/**/*.js'];

gulp.task('reload', function () {
    gulp.src(srcDirsUi)
        .pipe(print())
        .pipe(server.stream({once:true}));
        /*.pipe(server.notify('Hello this is a notification'));*/
});

gulp.task('notify', function() {
    server.notify('test notification');
})

gulp.task('typescript', function() {
    console.info("compile changes");
});

gulp.task('watch', function() {
    gulp.watch(srcDirsUi, ['reload']);
});

gulp.task('serve', function() {
    console.info('serve started...')

    //server.getSingletonEmitter().on("init", function() {
    //    console.info("Servicer initialized");
    //});

    server.init(
        {
            port: 8000,
            server: {
                baseDir: "./sabbat.notes.ui",
                index: "index.html"
            },
            // Change the default weinre port
            ui: {
                port: 8001,
                weinre: {
                    port: 8002
                }
            }
        });
});

gulp.task('default', ['serve', 'watch']);
