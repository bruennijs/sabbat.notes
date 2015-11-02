/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var user = require('./../../domain/Model');
var _ = require('underscore');

var testReg = require('./../TestRegistry');

var url = require('url');

suite("UserTest", function() {

  suiteSetup(function(done) {
    suite.ctx = testReg.Registry.Context;
    // init database
    var repo = suite.ctx.get('userRepository');
    var init = repo.Init(true);
    init.subscribeOnCompleted(done);
    init.subscribeOnError(done);
  });

  test("#when get membershipservice expect user inserted", function(done) {
    var sut = suite.ctx.get('membershipService');
    sut.createUser('olli', url.parse("oliver.bruentje@gmx.de"))
        .subscribe(function (next) {
          assert.equal(next.name, "olli");
          done();
        },
        function (error) {
          done(error);
        })
  });
});