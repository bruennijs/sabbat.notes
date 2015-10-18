/**
 * Created by bruenni on 24.09.15.
 */

import factory = require('./../../common/ddd/factory');
import model = require('./../../domain/Model');

export class NoteFactory implements factory.IFactory<model.Note> {

  ToMongoDocument(obj:model.Note): any {
    return obj;
  }

  CreateFromMongoDocument(document: any): model.Note {
    var obj = new model.Note();
    obj.load(document);
    return obj;
  }
}


