/**
 * Created by bruenni on 23.09.15.
 */

import persistence = require('./../common/ddd/persistence');

import model = require('./../domain/Model');
import id = require('./../common/infrastructure/service/IdGeneratorService');

export class NoteService {
  private repo: persistence.IRepository<model.Note>;
  private _idGeneratorService:id.IdGeneratorService;

  constructor(repo: persistence.IRepository<model.Note>, idGeneratorService: id.IdGeneratorService) {
    this.repo = repo;
    this._idGeneratorService = idGeneratorService;
  }

  public createNote(title: string): model.Note {
    var note = new model.Note(this._idGeneratorService.new(), title, "Add some content here");

    this.repo.Insert(note);

    return note;
  }
}
