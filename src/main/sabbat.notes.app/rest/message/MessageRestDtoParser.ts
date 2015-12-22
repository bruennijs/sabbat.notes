/**
 * Created by bruenni on 26.11.15.
 */

import url = require("url")

import {IDomainEvent, AggregateEvent} from "../../common/ddd/event";
import {Message} from "../../domain/message/Message";
import {MessageDtoParser, MessageEventDtoParser} from "../../infrastructure/adapter/dto/MessageDtoParser";
import {addSelfUrl} from "../dto/HttpResourceDto";

var MessagesCollectionUrl = "messages";

export var serialize = function(msg: Message): any {
  var serializer = new MessageDtoParser();

  var dtoObject = {};

  // add REST url

  serializer.serialize(dtoObject, msg);
  addSelfUrl.call(dtoObject, MessagesCollectionUrl, msg.id.value);

  return dtoObject;
};

export var serializeEvent = function(domainEvent: IDomainEvent): any {
  var serializer = new MessageEventDtoParser();

  var dtoObject = serializer.serialize(domainEvent);

  if (domainEvent instanceof AggregateEvent) {
    var aggregateEvent = domainEvent as AggregateEvent;
    addSelfUrl.call(dtoObject, MessagesCollectionUrl, aggregateEvent);
  }

  return dtoObject;
};



