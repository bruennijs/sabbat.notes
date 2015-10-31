/**
 * Created by bruenni on 23.09.15.
 */

import persistence = require('./../infrastructure/persistence/NoteRepository');

import model = require('./../common/ddd/model');
import models = require('./../domain/Model');

import factory = require('./../domain/note/NoteFactory');

/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />
import rx = require('rx');

export class NoteService {
  private _noteRepository: persistence.NoteRepository;
  private _noteFactory:factory.NoteFactory;

  constructor(repo: persistence.NoteRepository, noteFactory: factory.NoteFactory) {
    this._noteRepository = repo;
    this._noteFactory = noteFactory;
  }

  public createNote(ownerId: model.Id): rx.IObservable<models.Note> {
    var nextId = this._noteRepository.nextId();

    var note = new models.Note(nextId, ownerId);

    return this._noteRepository.Insert(note);
  }

  public findNotesByOwner(ownerId: string, cb: (err: Error, model: models.Note[]) => void) {
    this._noteRepository.FindByOwner(ownerId, function(err, objs) {
      cb(err, objs);
    })
  }
}
