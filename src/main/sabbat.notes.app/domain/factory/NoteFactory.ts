/**
 * Created by bruenni on 24.09.15.
 */

import factory = require('./../../common/ddd/factory');
import dddModel = require('./../../common/ddd/model');
import model = require('./../../domain/Model');
import repository = require('./../../domain/Model');

import mongodb = require('mongodb');
import _ = require('underscore');

export class NoteFactory implements factory.IFactory<model.Note> {

  ToMongoDocument(obj: model.Note): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id.value),
      content: obj.content,
      title: obj.content,
      ownerId: new mongodb.ObjectID(obj.ownerId.value)
    }
  }

  CreateFromMongoDocument(document: any): model.Note {
    var obj = new model.Note(new dddModel.Id(document._id), new dddModel.Id(document.ownerId));
    //obj.load(document);
    return obj;
  }
}


