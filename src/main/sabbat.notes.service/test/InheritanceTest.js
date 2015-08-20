/**
 * Created by bruenni on 20.08.15.
 */

var mocha = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var _ = require('underscore');

var ctor = (function() {
  var constr = function() {
  }

  constr.prototype.id = 0;
  constr.prototype.getId = function() {
    return this.id;
  };

  return constr;
})();

suite('Object inheritance', function() {
  test('#Existing object shall inherit functionality defined in prototype', function() {
    var existing = {id: 2};

    var sut = _.create(ctor.prototype, existing);

    assert.equal(2, sut.getId());
  });
});