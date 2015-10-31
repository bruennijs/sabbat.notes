/**
 * Created by bruenni on 23.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var jsm = require('jsmockito');

var ns = require('./../../application/MessageService');
var factory = require('./../../domain/message/MessageFactory');
var eventbus = require('./../../common/ddd/impl/DomainEventBusImpl');

var fs = require('fs');
var rx = require('rx');

var repoBuilder = require('./../builder/RepositoryBuilder');

suite('MessageServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

    test('when create document expect document contains id', function (done) {
      var userRepoMock = new repoBuilder().BuildStubbed();
      var msgRepoMock = new repoBuilder().BuildStubbed();

      var sut = new ns.MessageService(msgRepoMock, userRepoMock, new factory.MessageFactory(), new eventbus.DomainEventBusImpl());
      //var messageObs = sut.sendMessage();
      done();
    });
})
