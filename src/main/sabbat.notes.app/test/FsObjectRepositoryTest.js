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
var path = require('path');

suite('Array', function() {
    setup(function() {
    });

    suite('#indexOf()', function() {
        test('should return -1 when not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));

        });
    });
});

function InsertModels(repo, ids) {
  var objArray = [];
  ids.forEach(function (id) {
    var obj = new model.IdObject(id);
    repo.Insert(obj);
    objArray.push(obj);
  });

  return objArray;
};

suite('FsObjectRepositoryTests', function () {

    var that = this;

    setup(function() {
        that.path = path.join(process.cwd(), 'data');
        console.log("DB path [" + that.path + "]");
    });

    teardown(function() {
    });

    test('should create dir', function() {
          var repo = new Dal.FsObjectRepository(that.path);
          repo.Init();
          assert.equal(true, fs.existsSync(that.path), "path does not exist Init()");
    });

    test('should insert file', function (done) {
          var repo = new Dal.FsObjectRepository(that.path);

          var objs = InsertModels(repo, ['1', '2']);
          repo.Find(function(err, models) {
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
