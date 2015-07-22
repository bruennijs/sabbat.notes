var gulp = require("gulp");
var console = require("console")
var webserver = require("gulp-webserver")

gulp.task('default', ['serve']);

gulp.task('serve', function() {
    console.info('serve started...')

    stream = gulp.src('/usr/local/src/git/sabbat.notes/sabbat.notes.ui')
        .pipe(webserver(
            {
                port:8000,
                livereload: true,
                directoryListing: true,
                open:'http://127.0.0.1:8000/index.html',
                //path:'public',
                https:false}));
});

gulp.task('stop', function() {

})