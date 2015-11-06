/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');
import {Id} from "../../common/ddd/model";
import {Note} from "../Model";
import {IFactory} from "../../common/ddd/factory";

export class NoteFactory implements IFactory<Note> {

  ToMongoDocument(obj: Note): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id.value),
      content: obj.content,
      title: obj.content,
      ownerId: new mongodb.ObjectID(obj.ownerId.value)
    }
  }

  CreateFromMongoDocument(document: any): Note {
    var obj = new Note(new Id(document._id), new Id(document.ownerId));
    //obj.load(document);
    return obj;
  }
}


