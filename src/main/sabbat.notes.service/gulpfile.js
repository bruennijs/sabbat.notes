// gulp file

var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var glob = require('glob');
var spawn = require('child_process').spawn;

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

  var tsc = spawn('node', ['node_modules/typescript/bin/tsc',
                          '--module', 'commonjs',
                          '-t', 'ES5',
                          '--outDir', './dist/js',
                          //'./ts/Models.ts',
                          './ts/Dal.ts',
                          './ts/serverts.ts']);

  tsc.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.stderr.on('data', function(data) {
    console.log(data.toString());
    cb(data);
  });

  tsc.on('close', function(data) {
    console.log('Typescript compilier exited');
  });
});

gulp.task('js', function() {
  gulp.src('js/**/*.js').
      pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  //gulp.watch(srcDirsUi, ['reload']);
});

gulp.task('server', function(cb) {
  console.info('Serve started...');

  var tsc = spawn('node', ['./dist/js/server']);

  tsc.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.stderr.on('data', function(data) {
    console.log(data.toString());
    cb(data.toString());
  });

  tsc.on('close', function(data) {
    console.log('server exited');
  });
});

gulp.task('default', ['js', 'ts', 'server']);
