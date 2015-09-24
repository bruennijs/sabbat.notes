/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var repository = require('./../../../infrastructure/persistence/MongoDbRepository');

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
});