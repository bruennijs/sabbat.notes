/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');

import {Message, MessageState} from "./Message";
import {IFactory} from "../../common/ddd/factory";

export class MessageFactory implements IFactory<Message> {

  ToMongoDocument(obj: Message): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id.value),
      fromUserId: obj.from,
      toUserId: obj.to,
      content: obj.content,
      state: obj.currentState.toString()
    }
  }

  CreateFromMongoDocument(document: any): Message {
    return new Message(document._id, document.fromUserId, document.toUserId, document.content, MessageState[<string>document.state]);
  }
}


