/**
 * Created by root on 23.12.15.
 */

import {MessageEventDtoParser} from "../../../../infrastructure/adapter/dto/MessageDtoParser";
import {MessageReceivedEvent, MessageContextName} from "../../../../domain/message/MessageEvents";
import {MessageBuilder} from "../../../builder/MessageBuilder";
/**
 * Created by bruenni on 24.09.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var suiteSetup = require('mocha').suiteSetup;
var test = require('mocha').test;
var assert = require('assert');


suite("MessageEventDtoParserTest", function() {

  suiteSetup(function() {
  });

  test("#when serialize MessageReceivedEvent expect context and name set as expected", function() {
    var sut = new MessageEventDtoParser();

    var msg = new MessageBuilder().build();

    var dto = sut.serialize(new MessageReceivedEvent(msg));

    assert.equal(dto.name, MessageReceivedEvent.Name);
    assert.equal(dto.context, MessageContextName);
  });

  test("#when serialize MessageReceivedEvent expect content contains message", function() {
    var sut = new MessageEventDtoParser();

    var msg = new MessageBuilder().build();

    var dto = sut.serialize(new MessageReceivedEvent(msg));

    assert.equal(dto.content.id, msg.id.toString(), "message id not equal");
    assert.equal(dto.content.content, msg.content, "message contemt not equal");
  });
});
