/**
 * Created by bruenni on 24.09.15.
 */

  import model = require('Model');

export class NoteFactory {
  CreateFromMongoDocument(obj: any): Note {
    return new Note(obj);
  }
}


