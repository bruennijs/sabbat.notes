// gulp file

var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var server = require("browser-sync").create("sabbat.notes static server");
var glob = require('glob');
var gfilemetadata = require('commonjs/gulp-file-metadata');
var path = require('path');
var util = require('util');
//var exec = require('gulp-exec');
var exec = require('child_process').exec;

var srcDirsUi = ['*.html', 'html/**/*.html', 'html/*.html', 'css/**/*.css', 'js/**/*.js'];

gulp.task('reload', function () {
    gulp.src(srcDirsUi)
        .pipe(print())
        .pipe(server.stream({once:true}));
        /*.pipe(server.notify('Hello this is a notification'));*/
});

gulp.task('dist', function () {
    gulp.src(['*.html'])
      .pipe(gulp.dest("./dist"));

    gulp.src(['html/**'])
      .pipe(gulp.dest("./dist/html"));

    gulp.src(['js/**'])
      .pipe(gulp.dest("./dist/js"));

    gulp.src(['css/**'])
      .pipe(gulp.dest("./dist/css"));
});

gulp.task('notify', function() {
    server.notify('test notification');
});

gulp.task('ts', function(cb) {
    console.info("Typescript transpiling");

    var options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false,
        customTemplateThing: 'some string to be templated'
    };

/*    gulp.src(['sabbat.notes.ui/ts/!**!/!*.ts'])
        .pipe(gfilemetadata({log: true}))
        .pipe(exec('node node_modules/typescript/bin/tsc -d -t ES5 --out sabbat.notes.ui/dist/js/<%= file.name %> <%= file.path %>', options));*/

    exec("node node_modules/typescript/bin/tsc -d -t ES5 --out dist/js/dal.js ts/UserRepository.ts ts/Models.ts ts/Dal.ts", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watch', function() {
    gulp.watch(srcDirsUi, ['reload']);
});

gulp.task('serve', function() {
    console.info('serve started...')

    //server.getSingletonEmitter().on("init", function() {
    //    console.info("Servicer initialized");
    //});

    var baseDir = path.join(process.cwd(), "");

    console.log(util.format('Server base dir [%s]', baseDir));

    server.init(
        {
            port: 8000,
            server: {
                baseDir: baseDir,
                index: "html/index1.html"
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

gulp.task('default', ['dist', 'serve', 'watch']);
