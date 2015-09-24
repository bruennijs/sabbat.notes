/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="./../../node_modules/rx/ts/rx.all.d.ts"/>
///<reference path="./../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo = require('./../../common/ddd/persistence');
import model = require('./../../domain/Model');
//import rx = require('rx');
import mongodb = require('mongodb');

export class NoteRepository implements repo.IRepository<model.Note> {
  private _configuration:any;
  private _db: mongodb.Db = null;

  constructor(configuration: any) {
    this._configuration = configuration;
  }

  private Init(cb: (err: Error) => void): void {
    mongodb.MongoClient.connect(this._configuration.mongodb_url, function(err, db) {

      if (err == null) {
        console.log("Mongo db connected...");
        this._db = db;
      }
      cb(err);
    });
  }

  Get(cb:repo.Func2<Error, model.Note[], void>):void {

  }

  Insert(object:model.Note):void {
  }

/*  GetRx(): rx.IObservable<model.Note> {
    return null;
  }*/
}
