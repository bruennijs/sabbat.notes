/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var repository = require('./../../../infrastructure/persistence/NoteRepository');
var model = require('./../../../domain/Model');
var factory = require('./../../../domain/factory/NoteFactory');
var testConfig = require('./../../test.config');

var _ = require('underscore');

suite("NoteRepositoryTest", function() {

  suiteSetup(function() {
    //_.extend(testConfig, {collectionName: 'notes'});
  });

  test("#when init expect collections created", function(done) {
    var repo = new repository.NoteRepository(testConfig, new factory.NoteFactory());
    repo.Init(function(err) {
      if (err) {
        done(err);
        return;
      }

      done();
    }, true);
  });

  test("#when get expect collection empty", function(done) {
    var repo = new repository.NoteRepository(testConfig, new factory.NoteFactory());
    repo.Init(function(err) {
      if (err) {
        done(err);
        return;
      }

      // get documents
      repo.Find(function(err, notes) {
        if (!err) {

          assert.equal(0, notes.length);
          done();
        }
      });
    }, true);
  });

  test("#when insert expect collection contains this note", function(done) {
    var nf = new factory.NoteFactory();
    var repo = new repository.NoteRepository(testConfig, nf);
    repo.Init(function(err) {
      if (err) {
        done(err);
        return;
      }

      // insert
      repo.Insert(nf.Create('4711'), function(err, obj) {

        assert.equal(true, err === null, err);

        // get documents
        repo.Find(function(err, notes) {
          assert.equal(true, err === null, err);
          assert.equal(notes.length, 1);
          done();
        })
      });;
    }, true);
  });

  test("#when create note from factory", function() {
    var nf = new factory.NoteFactory();
    var obj = nf.Create("4711");
    console.info(obj);
  });
});