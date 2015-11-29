/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var suiteSetup = require('mocha').suiteSetup;
var suiteTeardown = require('mocha').suiteTeardown;
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

    var initialized = rx.Observable.when(userRepo.Init(true).and(msgRepo.Init(true)).thenDo(function(ret1, ret2) { return true; }));

    // insert users
    suite.u1 = new builder.UserBuilder().withId(userRepo.nextId()).Build();
    suite.u2 = new builder.UserBuilder().withId(userRepo.nextId()).Build();

    //// after db is initialized insert users
    var inserted = initialized.selectMany(function(success) {
      console.log("inserting users");
      return userRepo.Insert(suite.u1).merge(userRepo.Insert(suite.u2));
    });

    inserted.subscribeOnCompleted(function() {
      console.log("users inserted");
      done();
    });

    inserted.subscribeOnError(function(err) {
      console.log("users insert failed");
      done(err);
    });
  });

  suiteTeardown(function() {

  });

  test("#If send message by id expect message created with content", function(done) {
    var sut = suite.ctx.get('messageService');
    sut.sendById(suite.u1.id, suite.u2.id, "some content")
        .subscribe(function (next) {
          assert.equal(next.content, "some content");
          //assert.equal(next.email, "oliver.bruentje@gmx.de");
        },
        function (error) {
          done(error);
        },
        function() {
          done();
        });
  });
});