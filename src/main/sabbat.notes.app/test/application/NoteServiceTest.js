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
  });

  teardown(function() {
  });

    test('should insert file', function (done) {
      var sut = new ns.NoteService();

      done();
    });
})
