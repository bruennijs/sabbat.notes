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

var repoBuilder = require('./../builder/RepositoryBuilder');
var idGenBuilder = require('./../builder/IdGeneratorServiceBuilder');

suite('NoteServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

    test('when create document expect document contains id', function () {

      var expectedId = "4711";

      var repoMock = new repoBuilder().BuildMocked();

      var idGenMock = new idGenBuilder().withNewReturn(expectedId).BuildMocked();

      var sut = new ns.NoteService(repoMock, idGenMock);
      var model = sut.createNote('my title');

      assert.equal(model.id, expectedId);
    });
})
