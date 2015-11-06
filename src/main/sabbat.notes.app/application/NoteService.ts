/**
 * Created by bruenni on 23.09.15.
 */


/// <reference path="./../typings/tsd.d.ts" />

import rx = require('rx');
import {Note} from "../domain/Model";
import {Id} from "../common/ddd/model";
import {NoteFactory} from "../domain/note/NoteFactory";
import {NoteRepository} from "../infrastructure/persistence/NoteRepository";

export class NoteService {
  private _noteRepository: NoteRepository;
  private _noteFactory:NoteFactory;

  constructor(repo: NoteRepository, noteFactory: NoteFactory) {
    this._noteRepository = repo;
    this._noteFactory = noteFactory;
  }

  public createNote(ownerId: Id): rx.IObservable<Note> {
    var nextId = this._noteRepository.nextId();

    var note = new Note(nextId, ownerId);

    return this._noteRepository.Insert(note);
  }

  public findNotesByOwner(ownerId: string, cb: (err: Error, model: Note[]) => void) {
    this._noteRepository.FindByOwner(ownerId, function(err, objs) {
      cb(err, objs);
    })
  }
}
