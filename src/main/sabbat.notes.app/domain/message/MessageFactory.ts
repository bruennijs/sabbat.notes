/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');

import {Message, MessageState} from "./Message";
import {IFactory} from "../../common/ddd/factory";
import {Destination} from "./Message";
import {Id} from "../../common/ddd/model";
import {ObjectID} from "mongodb";

export class MessageFactory implements IFactory<Message> {

  /**
   * Serialization.
   * @param obj
   * @returns {{_id: "mongodb".ObjectID, fromId: Id, toId: Id, destinationType: DestinationType, content: *, state: any}}
   * @constructor
   */
  ToMongoDocument(obj: Message): any
  {
    return {
      _id: new ObjectID(obj.id.value),
      from: new ObjectID(obj.from.value),
      to: new ObjectID(obj.destination.to.value),
      destinationType: obj.destination.type,
      content: obj.content,
      state: obj.currentState.toString()
    };
  }

  /**
   * Deserialization
   */
  CreateFromMongoDocument(document: any): Message {
    return new Message(Id.parse(document._id.toHexString()),
        Id.parse(document.from.toHexString()),
        new Destination(Id.parse(document.to.toHexString()), document.destinationType),
        document.content,
        MessageState[<string>document.state]);
  }
}


