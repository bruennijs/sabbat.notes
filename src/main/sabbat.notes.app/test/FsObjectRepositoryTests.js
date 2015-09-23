/**
 * Created by bruenni on 18.08.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var Dal = require('./../infrastructure/persistence/Dal');
var model = require('./../common/ddd/model');
var fs = require('fs');

suite('Array', function() {
    setup(function() {
    });

    suite('#indexOf()', function() {
        test('should return -1 when not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));

        });
    });
});

function InsertModels(ids) {
  ids.forEach(function (id) {
    this.sut.Insert(new model.IdObject(id));
  });
};

suite('FsObjectRepositoryTests', function () {

    setup(function() {
        this.path = 'dist/js/db/test';
        this.sut = new Dal.FsObjectRepository(this.path);
    });

    teardown(function() {
    });

    suite('#Crud', function() {
        test('should create dir', function() {
            var repo = new Dal.FsObjectRepository(this.path);
            repo.Init();
            assert.equal(true, fs.existsSync(this.path), "path does not exist Init()");
        });

        test('should insert file', function (done) {
          var objs = InsertModels.call(suite, ['1', '2']);
          this.sut.Get(function(err, models) {
                assert.equal(2, models.length);
                assert.equal(true, models.some(function(o) {
                  return o.id === objs[0].id;
                }));

                assert.equal(true, models.some(function(o) {
                  return o.id === objs[1].id;
                }));

                done();
            });
        });

      test('should observable fire inserted models', function () {
      });
    })
})
