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

  private _collectionName: string = 'users';

  private _db: mongodb.Db = null;
  private _collection: mongodb.Collection = null;

  constructor(configuration: any) {
    this._configuration = configuration;
  }

  private Init(cb: (err: Error) => void, dropCollections?: boolean): void {

    var that = this;

    mongodb.MongoClient.connect(this._configuration.mongodb_url, function(err, db) {

      if (err != null) {
        cb(err);
        return;
      }

      console.log("Mongo db connected...");
      that._db = db;

      // get collection users
      var col = that._db.collection(that._collectionName);
      if (!col)
      {
        // create new collection
        that.CreateCollection(function(err, col) {
          cb(err);
        });
      }
      else
      {
        // collection already exist

        if (dropCollections)
        {
          /// drop collection
          that._db.dropCollection(that._collectionName, function(err, col) {
            // create new collection
            that.CreateCollection(function(err, col) {
              cb(err);
            });
          });
        }
        else {
          that._collection = col;
          cb(err);
        }
      }
    });
  }

  Get(cb:repo.Func2<Error, model.Note[], void>):void {
  if (!this._collection)
    {
      throw new Error('Not initialized');
    }

    //// fidn all items
    this._collection.find({}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        //console.log(item);
        models.push(new model.Note(item.id, item.title, item.content));
      });

      cb(err, models);
    });
  }

  Insert(object:model.Note, cb: (err: Error) => void): void {
    //console.log(JSON.stringify(object));

    this._collection.insertOne({_id: object.id, title: object.title}, function(err, result) {
      console.log("result["  + result + "]");
      cb(err);
    });
  }

  private CreateCollection(cb: (err: Error, col: mongodb.Collection) => void) {
    var that = this;
    this._db.createCollection(this._collectionName, function(err, col) {
      if (!err)
      {
        that._collection = col;
      }

      cb(err, col);
    });
  }

/*  GetRx(): rx.IObservable<model.Note> {
    return null;
  }*/
}
