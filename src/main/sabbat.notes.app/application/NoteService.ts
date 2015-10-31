/**
 * Created by bruenni on 23.09.15.
 */

import persistence = require('./../infrastructure/persistence/NoteRepository');

import model = require('./../common/ddd/model');
import models = require('./../domain/Model');

import factory = require('./../domain/note/NoteFactory');

export class NoteService {
  private _noteRepository: persistence.NoteRepository;
  private _noteFactory:factory.NoteFactory;

  constructor(repo: persistence.NoteRepository, noteFactory: factory.NoteFactory) {
    this._noteRepository = repo;
    this._noteFactory = noteFactory;
  }

  public createNote(ownerId: model.Id, cb: (err: Error, model: models.Note) => void) {
    var nextId = this._noteRepository.nextId();

    var note = new models.Note(nextId, ownerId);

    this._noteRepository.Insert(note, function(err, newItem) {
      cb(err, newItem);
    });
  }

  public findNotesByOwner(ownerId: string, cb: (err: Error, model: models.Note[]) => void) {
    this._noteRepository.FindByOwner(ownerId, function(err, objs) {
      cb(err, objs);
    })
  }
}
