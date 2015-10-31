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

var dddModel = require('./../../common/ddd/model');
var user = require('./../../domain/Model');

var rx = require('rx');
var _ = require('underscore');

var repoBuilder = require('./../builder/RepositoryBuilder');
var modelBuilder = require('./../builder/ModelBuilder');

suite('MessageServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

    test('when create document expect document contains id', function (done) {
      //var userRepoMock = new repoBuilder().BuildStubbed();
      //var msgRepoMock = new repoBuilder().BuildStubbed();

      var userFrom = new modelBuilder.UserBuilder().Build(new dddModel.Id("1"));
      var userTo   = new modelBuilder.UserBuilder().Build(new dddModel.Id("2"));

      var userRepoMock = new repoBuilder().BuildMock();
      jsm.JsMockito.when(userRepoMock).GetById(userFrom.id).thenReturn(rx.Observable.return(userFrom));
      jsm.JsMockito.when(userRepoMock).GetById(userTo.id).thenReturn(rx.Observable.return(userTo));

      var msgRepoMock = new repoBuilder().BuildMock();

      // create sut
      var sut = new ns.MessageService(msgRepoMock, userRepoMock, new factory.MessageFactory(), new eventbus.DomainEventBusImpl());
      var messageObs = sut.sendMessage(userFrom.id.toString(), userTo.id.toString(), "some content");

      messageObs.subscribe(function(msg) {
        assert.equal(msg.from.toString(), "1");
        assert.equal(msg.to.toString(), "2");
        assert.equal(msg.content, "some content");
        done();
      });
    });

  test('when extend document expect properties are copyied', function () {
    var o1 = {to: "hello"}
    var o2 = {from: "you"}

    var o3 = _.extend(o1, o2);

    assert.equal("hello", o3.to);
    assert.equal("you", o3.from);
  })
})
