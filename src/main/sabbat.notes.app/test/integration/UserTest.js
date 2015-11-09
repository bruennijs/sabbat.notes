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
    suite.repo = suite.ctx.get('userRepository');
    suite.service = suite.ctx.get('membershipService');
    var init = suite.repo.Init(true);
    init.subscribeOnCompleted(done);
    init.subscribeOnError(done);
  });

  suiteTeardown(function() {

  });

  test("#when get membershipservice expect user inserted", function(done) {
    suite.service.createUser('olli', url.parse("oliver.bruentje@gmx.de"))
        .subscribe(function (next) {
              assert.equal(next.name, "olli");
              //assert.equal(next.email, "oliver.bruentje@gmx.de");
            },
            function (error) {
              done(error);
            },
            function() {
              done();
            })
  });

  test("#when find user by name in userRepository expect found one item", function(done) {

    var userName = "32d2";

    suite.service.createUser(userName, url.parse("oliver.bruentje@gmx.de")).subscribe(function() {
      suite.repo.FindByName(userName)
          .subscribe(function (users) {
                assert.equal(users.length, 1);
                assert.equal(users[0].name, userName);
                //assert.equal(next.email, "oliver.bruentje@gmx.de");
              },
              function (error) {
                done(error);
              },
              function() {
                done();
              })
    },
    function(error) {
      done(error);
    });
  });
});