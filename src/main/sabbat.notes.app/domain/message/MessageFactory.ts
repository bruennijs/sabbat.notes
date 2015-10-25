/**
 * Created by bruenni on 24.09.15.
 */

import factory = require('./../../common/ddd/factory');
import model = require('./Message');

import mongodb = require('mongodb');
import _ = require('underscore');

export class MessageFactory implements factory.IFactory<model.Message> {

  ToMongoDocument(obj: model.Message): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id.value),
      fromUserId: obj.from,
      toUserId: obj.to,
      content: obj.content,
      state: obj.currentState.toString()
    }
  }

  CreateFromMongoDocument(document: any): model.Message {
    return new model.Message(document._id, document.fromUserId, document.toUserId, document.content, model.MessageState[<string>document.state]);
  }
}


