/**
 * Created by bruenni on 23.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var ns = require('./../../application/NoteService');
var factory = require('./../../domain/note/NoteFactory');

var jsm = require('jsmockito')
var mongo = require('mongodb');

var repoBuilder = require('./../builder/Builder').RepositoryBuilder;

suite('NoteServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

  test('when create document expect document contains id', function (done) {

    var expectedOwnerId = new mongo.ObjectID();

    var repoMock = new repoBuilder().BuildStubbed();

    var sut = new ns.NoteService(repoMock, new factory.NoteFactory());
    var obs = sut.createNote(expectedOwnerId);
    obs.subscribe(
        function(note) {
          //console.info(model.id);
          assert.equal(note.ownerId, expectedOwnerId);
        },
        function(err) {
          done(err);
        },
        function() {
          done();
        });
  });
})
