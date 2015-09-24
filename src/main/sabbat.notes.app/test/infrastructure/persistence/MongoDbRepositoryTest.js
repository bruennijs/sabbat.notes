/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var repository = require('./../../../infrastructure/persistence/MongoDbRepository');
var model = require('./../../../domain/Model');

suite("MongoDbRepositoryTest", function() {

  suite.config = {
    mongodb_url: "mongodb://172.17.0.2:27017/sabbat"
  };

  test("#when init expect collections created", function(done) {
    var repo = new repository.NoteRepository(suite.config);
    repo.Init(function(err) {
      console.log(err);
      assert.equal(true, err === null);
      done();
    });
  });

  test("#when get expect collection empty", function(done) {
    var repo = new repository.NoteRepository(suite.config);
    repo.Init(function(err) {
      assert.equal(true, err === null);

      // get documents
      repo.Get(function(err, notes) {
        assert.equal(true, err === null);
        assert.equal(0, notes.length);
        done();
      });
    });
  });

  test("#when insert expect collection contains this note", function(done) {
    var repo = new repository.NoteRepository(suite.config);
    repo.Init(function(err) {
      assert.equal(true, err === null);

      // insert
      repo.Insert(new model.Note('1', 'title text', 'content'), function(err, obj) {

        assert.equal(true, err === null);

        // get documents
        repo.Get(function(err, notes) {
          assert.equal(true, err === null);
          assert.equal(1, notes.length);
          done();
        })
      });;
    });
  });
});