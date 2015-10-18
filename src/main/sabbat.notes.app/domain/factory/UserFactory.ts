/**
 * Created by bruenni on 24.09.15.
 */

import factory = require('./../../common/ddd/factory');
import model = require('./../../domain/Model');

import mongodb = require('mongodb');
import _ = require('underscore');

export class UserFactory implements factory.IFactory<model.User> {

  Create(name: string): model.User {
    return new model.User(new mongodb.ObjectID().toString(), name);
  }

  ToMongoDocument(obj: model.User): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id),
      name: obj.name
    }
  }

  CreateFromMongoDocument(document: any): model.User {
    return new model.User(document._id, document.name);
  }
}


