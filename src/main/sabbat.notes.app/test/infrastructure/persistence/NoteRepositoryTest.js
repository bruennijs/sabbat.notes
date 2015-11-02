/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var model = require('./../../../common/ddd/model');
var repository = require('./../../../infrastructure/persistence/NoteRepository');
var models = require('./../../../domain/Model');
var factory = require('./../../../domain/note/NoteFactory');
var testConfig = require('./../../test.config');

var _ = require('underscore');
var mongo = require('mongodb');

suite("NoteRepositoryTest", function() {

  suiteSetup(function() {
    //_.extend(testConfig, {collectionName: 'notes'});
  });

  test("#when init expect collections created", function(done) {
    var sut = new repository.NoteRepository(testConfig, new factory.NoteFactory());
    var init = sut.Init(true);

    init.subscribeOnCompleted(done);
    init.subscribeOnError(done);
  });

  test("#when get expect collection empty", function(done) {
    var sut = new repository.NoteRepository(testConfig, new factory.NoteFactory());
    var init = sut.Init(true);

    init.subscribeOnCompleted(function () {

      // get documents
      sut.Find(function(err, notes) {
        if (!err) {

          assert.equal(0, notes.length);
          done();
        }
      });
    });

    init.subscribeOnError(done);
  });

  test("#when insert expect collection contains this note", function(done) {
    var nf = new factory.NoteFactory();
    var sut = new repository.NoteRepository(testConfig, nf);
    var init = sut.Init(true);

    init.subscribeOnCompleted(function () {

      var noteToInsert = new models.Note(sut.nextId(), new model.Id(new mongo.ObjectID().toString()));

      // insert
      var insertObs = sut.Insert(noteToInsert);
      insertObs.subscribe(function(createdNote) {
          assert.equal(createdNote.id.toString(), noteToInsert.id.toString());

          // get documents
          sut.Find(function(err, notes) {
            assert.equal(true, err === null, err);
            assert.equal(notes.length, 1);
            done();
          });
        },
        function(exc) {
          console.log("FAIL INSERT");
          assert.fail(exc);
          done(exc);
        },
        // onCompleted
        function() {
          console.log("completed");
        });
    });

    init.subscribeOnError(done);
  });

  test("#when findByOwner expect returns only created one with expected ownerid", function(done) {
    var expectedOwnerId = new mongo.ObjectID();

    var nf = new factory.NoteFactory();
    var sut = new repository.NoteRepository(testConfig, nf);

    var noteToInsert = new models.Note(sut.nextId(), new model.Id(expectedOwnerId));

    var init = sut.Init(true);

    init.subscribeOnCompleted(function () {
      // insert note
      var insert = sut.Insert(noteToInsert);

      insert.subscribe(function(createdNote) {
            // find note by owner
            sut.FindByOwner(expectedOwnerId.toString(), function (err, models) {
              // expect one model

              console.info(models[0]);

              assert.equal(1, models.length);
              // with identity of created one
              assert.equal(createdNote.id.value, models[0].id.value);

              done();
            });
          },
          // onError
          function(err) {
            done(err);
          });
    });

    init.subscribeOnError(done);
  });
});