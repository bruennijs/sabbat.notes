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

var msgEvents = require('./../../domain/message/MessageEvents');

var rx = require('rx');
var _ = require('underscore');

var userBuilder = require('./../builder/Builder').UserBuilder;
var repoBuilder = require('./../builder/Builder').RepositoryBuilder;

suite('MessageServiceTest', function () {

  setup(function() {
  });

  teardown(function() {
  });

    test('when create document expect document contains id', function (done) {
      //var userRepoMock = new builder().BuildStubbed();
      //var msgRepoMock = new builder().BuildStubbed();

      var userRepoMock = new repoBuilder().BuildMock();
      jsm.JsMockito.when(userRepoMock).GetById(JsHamcrest.Matchers.anything()).then(function(id) { return rx.Observable.return(new userBuilder().withId(id).Build()); });

      var msgRepoMock = new repoBuilder().BuildMock();

      // create sut
      var sut = new ns.MessageService();
      sut.messageRepository = msgRepoMock;
      sut.userRepository = userRepoMock;
      sut.messageFactory = new factory.MessageFactory();
      sut.eventBus = new eventbus.DomainEventBusImpl();

      var messageObs = sut.sendById(dddModel.Id.parse("1"), dddModel.Id.parse("2"), "some content");

      messageObs.subscribe(
          function(msg) {
            assert.equal(msg.from.toString(), "1");
            assert.equal(msg.destination.to.toString(), "2");
            assert.equal(msg.content, 'some content');
          },
          function(error) {
            done(error);
          },
          function() {
            done();
          });
    })

  test('when create document expect message created event fired', function (done) {
    //var userRepoMock = new builder().BuildStubbed();
    //var msgRepoMock = new builder().BuildStubbed();

    var bus = new eventbus.DomainEventBusImpl();

    var userRepoMock = new repoBuilder().BuildMock();
    //jsm.JsMockito.when(userRepoMock).GetById(userFrom.id).thenReturn(rx.Observable.return(userFrom));
    //jsm.JsMockito.when(userRepoMock).GetById(userTo.id).thenReturn(rx.Observable.return(userTo));
    jsm.JsMockito.when(userRepoMock).GetById(JsHamcrest.Matchers.anything()).then(function(id) { return rx.Observable.return(new userBuilder().withId(id).Build()); });

    var msgRepoMock = new repoBuilder().BuildMock();

    // create sut
    var sut = new ns.MessageService();
    sut.messageRepository = msgRepoMock;
    sut.userRepository = userRepoMock;
    sut.messageFactory = new factory.MessageFactory();
    sut.eventBus = bus;

    var message = sut.sendById(dddModel.Id.parse("1"), dddModel.Id.parse("3"), 'some content');

    var combined = rx.Observable.when(message.and(bus.subscribe("message")).thenDo(function(msg, ev) { return {message: msg, event: ev }})).timeout(500);

    // check whether message and event are correct
    combined.subscribe(function(map) {
        assert.ok(map.event instanceof msgEvents.MessageCreatedEvent, "bus event is not expected type[" + map.event + "]");
      },
      function(err) {
        done(err);
      },
        function() {
          done();
        });
  })

  test('when extend document expect properties are copyied', function () {
    var o1 = {to: "hello"}
    var o2 = {from: "you"}

    var o3 = _.extend(o1, o2);

    assert.equal("hello", o3.to);
    assert.equal("you", o3.from);
  })
})
