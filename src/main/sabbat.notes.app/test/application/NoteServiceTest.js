/**
 * Created by bruenni on 23.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var ns = require('./../../application/NoteService');
var fs = require('fs');

suite('NoteServiceTest', function () {

  setup(function() {
    this.sut = new ns.NoteService(this.path);
  });

  teardown(function() {
  });

  suite('#Crud', function() {
    test('should create dir', function() {
      var repo = new Dal.Repository.FsObjectRepository(this.path);
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
