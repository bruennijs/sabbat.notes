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

    suite.userRepo = suite.ctx.get('userRepository');
    suite.msgRepo  = suite.ctx.get('messageRepository');

    var initialized = suite.userRepo.Init(true).merge(suite.msgRepo.Init(true));

    // insert users
    suite.u1 = new builder.UserBuilder().withId(suite.userRepo.nextId()).withName("hans").Build();
    suite.u2 = new builder.UserBuilder().withId(suite.userRepo.nextId()).withName("peter").Build();

    //// after db is initialized insert users
    var inserted = initialized.subscribeOnCompleted(function() {
      suite.userRepo.Insert(suite.u1)
          .merge(suite.userRepo.Insert(suite.u2))
          .subscribe(function() {},
                     function(err) {
                       done(err);
                     },
                    function() {
                      done();
                    });
    });
  });

  suiteTeardown(function() {

  });

  suite("#sendById", function() {
    test("#If send expect message created with content", function(done) {
      var expectedContent = "some content";

      var sut = suite.ctx.get('messageService');
      sut.sendById(suite.u1.id, suite.u2.id, expectedContent)
          .subscribe(function (next) {
                assert.equal(next.content, expectedContent);
                assert.equal(next.from.toString(), suite.u1.id.toString());
                assert.equal(next.destination.to.toString(), suite.u2.id.toString());
              },
              function (error) {
                done(error);
              },
              function() {
                done();
              });
    });

    test("#If send by name expect message to equals corresponding user id", function(done) {
      var expectedContent = "some content";

      var sut = suite.ctx.get('messageService');
      sut.sendByName(suite.u1.id, suite.u2.name, expectedContent)
          .subscribe(function (next) {
                assert.equal(next.destination.to.toString(), suite.u2.id.toString());
              },
              function (error) {
                done(error);
              },
              function() {
                done();
              });
    });
  });
});