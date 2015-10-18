/**
 * Created by bruenni on 23.09.15.
 */

import persistence = require('./../infrastructure/persistence/NoteRepository');

import model = require('./../domain/Model');

import factory = require('./../domain/factory/NoteFactory');

export class NoteService {
  private repo: persistence.NoteRepository;
  private _noteFactory:factory.NoteFactory;

  constructor(repo: persistence.NoteRepository, noteFactory: factory.NoteFactory) {
    this.repo = repo;
    this._noteFactory = noteFactory;
  }

  public createNote(ownerId: string, cb: (err: Error, model: model.Note) => void) {
    var note = this._noteFactory.Create(ownerId)

    this.repo.Insert(note, function(err) {
      cb(err, note);
    });
  }

  public findNotesByOwner(ownerId: string, cb: (err: Error, model: model.Note[]) => void) {
    this.repo.FindByOwner(ownerId, function(err, objs) {
      cb(err, objs);
    })
  }
}
