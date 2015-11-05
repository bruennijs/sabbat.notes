/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var dddModel = require('./../../common/ddd/model');
var builder = require('./../builder/Builder');
var _ = require('underscore');
var rx = require('rx');

var testReg = require('./../TestRegistry');

suite("MessageTest", function() {

  suiteSetup(function(done) {
    suite.ctx = testReg.Registry.Context;
    // init database
    var userRepo = suite.ctx.get('userRepository');
    var msgRepo = suite.ctx.get('messageRepository');
    var initMsgRepo = msgRepo.Init(true);

    var initUserRepo = userRepo.Init(true)
        .do(function(next) {
            // create users
          console.log("sr completed");
          userRepo.Insert(new builder.UserBuilder().withId("1").Build());
          userRepo.Insert(new builder.UserBuilder().withId("2").Build());
        });

    var merged = initMsgRepo.merge(initUserRepo);
    merged.subscribeOnCompleted(function() {
      console.log("merge completed");
      done();
    });
    merged.subscribeOnError(function(err) {
      console.log("merge completed");
      done(err);
    });
  });

  suiteTeardown(function() {

  });

  test("#when get membershipservice expect user inserted", function(done) {
    var sut = suite.ctx.get('messageService');
    var userRepo = suite.ctx.get('userRepository');

    sut.sendMessage(userRepo.nextId(), userRepo.nextId(), "some content")
        .subscribe(function (next) {
          assert.equal(next.content, "some content");
          //assert.equal(next.email, "oliver.bruentje@gmx.de");
        },
        function (error) {
          done(error);
        },
        function() {
          done();
        })
  });
});