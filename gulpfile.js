var gulp = require("gulp");
var print = require("gulp-print")
var console = require("console")
var webserver = require("gulp-webserver")
var glob = require('glob')

gulp.task('default', ['serve']);

gulp.task('serve', function() {
    console.info('serve started...')

    stream = gulp.src(["sabbat.notes.ui/*.html", "sabbat.notes.ui/css/*.css"])
        .pipe(print(function(path) {
            console.info(path);
        }))
        .pipe(webserver(
            {
                port:8000,
                livereload: true,
                directoryListing: true,
                open:'http://localhost:8000/index.html',
                //path:'public',
                https:false}));
});

gulp.task('stop', function() {
    webserver.reload;
})

gulp.task('dirs', function() {
    glob("**", {ignore: "node_modules"}, function(err, files) {
        files.forEach(function(val, idx) {
            console.info(val + "[" + idx + "]")
        })
    })
})