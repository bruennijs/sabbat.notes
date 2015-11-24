/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');

import {Message, MessageState} from "./Message";
import {IFactory} from "../../common/ddd/factory";
import {Destination} from "./Message";

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
      _id: new mongodb.ObjectID(obj.id.value),
      fromId: obj.from,
      toId: obj.destination.To,
      destinationType: obj.destination.Type,
      content: obj.content,
      state: obj.currentState.toString()
    };
  }

  /**
   * Deserialization
   */
  CreateFromMongoDocument(document: any): Message {
    return new Message(document._id,
        document.fromId,
        new Destination(document.toId, document.destinationType),
        document.content,
        MessageState[<string>document.state]);
  }
}


