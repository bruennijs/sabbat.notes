/**
 * Created by bruenni on 24.09.15.
 */

import factory = require('./../../common/ddd/factory');
import model = require('./../../domain/Model');

import mongodb = require('mongodb');
import _ = require('underscore');

export class NoteFactory implements factory.IFactory<model.Note> {

  /**
   * Creates new note
   * @param ownerId
   * @return {Note}
   * @constructor
   */
  Create(ownerId: string): model.Note {
    return new model.Note(new mongodb.ObjectID().toString(), ownerId);
  }

  ToMongoDocument(obj:model.Note): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id),
      content: obj.content,
      title: obj.content,
      ownerId: obj.ownerId
    }
  }

  CreateFromMongoDocument(document: any): model.Note {
    var obj = new model.Note(document._id, document.ownerId);
    //obj.load(document);
    return obj;
  }
}


