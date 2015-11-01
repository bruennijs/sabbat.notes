// gulp file

var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var glob = require('glob');
var spawn = require('child_process').spawn;
var exec = require('gulp-exec');
var path = require('path');

var distBaseDir = './../dist/sabbat.notes.app';


gulp.task('ts.dist', function() {
  console.info("Typescript transpiling");

  /*    gulp.src(['sabbat.notes.ui/ts/!**!/!*.ts'])
   .pipe(gfilemetadata({log: true}))
   .pipe(exec('node node_modules/typescript/bin/tsc -d -t ES5 --out sabbat.notes.ui/dist/<%= file.name %> <%= file.path %>', options));*/

  var tsc = spawn('node', ['node_modules/typescript/bin/tsc',
                          '--module', 'commonjs',
                          '-t', 'ES5',
                            //'--noLib',
                          '--outDir', distBaseDir,
                          './infrastructure/persistence/Dal.ts',
                          './infrastructure/persistence/NoteRepository.ts',
                          './infrastructure/persistence/UserRepository.ts',
                          './domain/Model.ts',
                          './domain/note/NoteFactory.ts',
                            './domain/user/UserFactory.ts',
                            './domain/message/MessageFactory.ts',
                            './domain/message/Message.ts',
                            './domain/message/MessageEvents.ts',
                          './application/NoteService.ts',
                            './application/MessageService.ts',
                          './application/MembershipService.ts',
                            './ApplicationRegistry.ts',]);

  tsc.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.on('close', function(data) {
    console.log('Typescript compilier exited');
  });
});

gulp.task('ts.common.dist', function(cb) {
  console.info("Typescript transpiling");

  var options = {
    continueOnError: true, // default = false, true means don't emit error event
    pipeStdout: false,
    customTemplateThing: 'some string to be templated'
  };

  /*    gulp.src(['sabbat.notes.ui/ts/!**!/!*.ts'])
   .pipe(gfilemetadata({log: true}))
   .pipe(exec('node node_modules/typescript/bin/tsc -d -t ES5 --out sabbat.notes.ui/dist/<%= file.name %> <%= file.path %>', options));*/

  var tsc = spawn('node', ['node_modules/typescript/bin/tsc',
    '--module', 'commonjs',
    '-t', 'ES5',
    //'--noLib',
    '--outdir', path.join(distBaseDir, 'common'),
    './common/ddd/model.ts',
    './common/ddd/persistence.ts',
    './common/ddd/factory.ts',
    './common/ddd/impl/DomainEventBusImpl.ts',
    './common/infrastructure/service/IdGeneratorService.ts',
    './common/infrastructure/persistence/MongoDbRepository.ts']);

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

gulp.task('js.dist', function() {
  gulp.src('**/*.js').
      pipe(gulp.dest(distBaseDir));
});

gulp.task('modules.dist', function() {
    gulp.src('node_modules/**/*').
        pipe(gulp.dest(path.join(distBaseDir, 'node_modules')));
});

gulp.task('watch.test', function() {
  gulp.watch('./common/**/*.{ts,js}', ['test']);
  gulp.watch('./application/**/*.{ts,js}', ['test']);
  gulp.watch('./domain/**/*.{ts,js}', ['test']);
  gulp.watch('./infrastructure/**/*.{ts,js}', ['test']);
  gulp.watch('./test/**/*.{ts,js}', ['test']);
});

gulp.task('test.dist', function () {
    gulp.src(['test/**/*.js', 'test/**/*.json'])
       .pipe(gulp.dest(path.join(distBaseDir, 'test')));
});

gulp.task('test.run', function () {
    var opt = {
        continueOnError: true, // default = false, true means don't emit error event
        pipeStdout: false
    };

    gulp.src(path.join(distBaseDir, 'test/**/*Test.js'))
        .pipe(print())
        .pipe(exec(path.join(distBaseDir, 'node_modules/mocha/bin/mocha') + ' --ui tdd --reporter dot <%= file.path %>', opt))
        .pipe(exec.reporter());
});

gulp.task('dist', ['modules.dist', 'js.dist', 'ts.common.dist', 'ts.dist', 'test.dist']);

gulp.task('test', ['dist', 'test.run']);


