/**
 * Created by bruenni on 25.10.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var bus = require('../../../common/ddd/impl/DomainEventBusImpl');
var rx = require('rx');

suite("DomainEventBusImplTest", function() {

    test("#when subscribed expect publish of event publishes rx observable", function (done) {

        var event = {
            group: "test",
            data: "some event data"
        };

        var sut = new bus.DomainEventBusImpl();
        var observable = sut.Subscribe('test');
        var disposable = observable.subscribe(
            function(next) {
                assert.equal(event.data, next.data, "evented data not equal");
                done();
            },
            function(exception) {
                console.log("onError[" + exception + "]");
            },
            function() {
                console.log("onCompleted");
            });

        //// fire event
        sut.Publish(event);
    });

    test("#when subscribed two groups expect events dispatched to correct observables", function (done) {

        var that = this;

        var event0 = {
            group: "group0",
            data: "some event data"
        };

        var event1 = {
            group: "group1",
            data: "some event data"
        };

        var actualEvents = [];

        var sut = new bus.DomainEventBusImpl();
        var observable0 = sut.Subscribe(event0.group);
        var observable1 = sut.Subscribe(event1.group);

        //// fire event (can be done like this cause replaysubjects)
        sut.Publish(event0);
        sut.Publish(event1);

        observable0.merge(observable1).take(2).subscribe(function(next)
            {
                actualEvents.push(next);
            },
            function(exception) {
                console.log("onError[" + exception + "]");
            },
            function() {
                console.log("onCompleted");
                assert.equal(2, actualEvents.length, "evented events not 2");
                assert.equal(true, actualEvents.some(function(e) { return e.group === event0.group; }));
                assert.equal(true, actualEvents.some(function(e) { return e.group === event1.group; }));
                done();
            });
    });
});
