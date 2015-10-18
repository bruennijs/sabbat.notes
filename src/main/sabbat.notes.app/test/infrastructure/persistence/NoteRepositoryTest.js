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
var mongo = require('mongodb');

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
      repo.Insert(nf.Create(new mongo.ObjectID().toString()), function(err, obj) {

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
    var obj = nf.Create(new mongo.ObjectID().toString());
    console.info(obj);
  });

  test("#when findByOwner expect returns only created one with expected ownerid", function(done) {
    var expectedOwnerId = new mongo.ObjectID();

    var nf = new factory.NoteFactory();
    var sut = new repository.NoteRepository(testConfig, nf);

    var created = nf.Create(expectedOwnerId.toString());

    sut.Init(function(err) {
      // insert note
      sut.Insert(created, function (err, created) {
        if (!err) {
          // find note by owner
          sut.FindByOwner(expectedOwnerId.toString(), function (err, models) {
            // expect one model

            console.info(models[0]);

            assert.equal(1, models.length);
            // with identity of created one
            assert.equal(created.id, models[0].id);
            done();
          });
        }
        else {
          done(err);
        }
      });
    });
  });
});