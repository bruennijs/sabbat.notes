/**
 * Created by bruenni on 10.11.15.
 */

/*
 * Created by bruenni on 16.10.15.
 */

import {Message} from "../../domain/message/Message";
import {Note} from "../../domain/Model";
import {IdObject} from "../../common/ddd/model";
import {Id} from "../../common/ddd/model";
var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

suite("MessageTest", function() {

  test("#when message delivered expect create message state delivered when no deliveries are outstanding", function () {
    var sut = new Message(new Id("4711"));

    assert.equal("4711", sut.id);
  });

  test("#when load note json string expect loadFrom loads into properties", function () {
    var sut = new Note(new Id("12"), new Id(""));
    sut.loadFrom('{"_id":"12", "_title":"parsed title"}');

    console.info('loadFrom[' + sut + ']') ;

    assert.equal("12", sut.id);
    assert.equal("parsed title", sut.title);
  });
});
