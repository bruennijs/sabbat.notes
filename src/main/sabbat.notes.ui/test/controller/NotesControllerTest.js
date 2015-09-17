/**
 * Created by bruenni on 17.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var Dal = require('../../js/controller/NotesController.js');

suite('NotesController', function() {
  setup(function() {
  });

  suite('#add item', function() {
    test('should add item to notes array', function() {
      module
      assert.equal()
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
