/**
 * Created by bruenni on 23.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var ns = require('./../../application/NoteService');
var factory = require('./../../domain/factory/NoteFactory');

var fs = require('fs');

var repoBuilder = require('./../builder/RepositoryBuilder');


suite('NoteServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

    test('when create document expect document contains id', function (done) {

      var expectedOwnerId = "0812";

      var repoMock = new repoBuilder().BuildMocked();

      var sut = new ns.NoteService(repoMock, new factory.NoteFactory());
      var model = sut.createNote(expectedOwnerId, function(err, model) {
        assert.equal(true, err === null, err);
        //console.info(model.id);
        assert.equal(model.ownerId, expectedOwnerId);
        done();
      });
    });
})
