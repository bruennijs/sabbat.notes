/**
 * Created by bruenni on 24.09.15.
 */

// ///<reference path="./../../node_modules/rx/ts/rx.all.d.ts"/>
///<reference path="./../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo = require('./../../common/ddd/persistence');
import model = require('./../../domain/Model');
//import rx = require('rx');
import mongodb = require('mongodb');

export class NoteRepository implements repo.IRepository<model.Note> {
  private _configuration:any;

  constructor(configuration: any) {
    this._configuration = configuration;
  }

  private Init() {
    mongodb.MongoClient.connect(this._configuration.mongodb_url, function(err, db) {
      console.log("Mongo db connected...");
      console.log("Collections:");
      db.collections(function(err, cols) {
        cols.forEach(function(col, num, array) {
          console.log(col);
        });
      });
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
