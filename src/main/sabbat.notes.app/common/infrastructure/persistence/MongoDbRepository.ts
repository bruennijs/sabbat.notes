/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="./../../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo    = require('./../../ddd/persistence');
import model    = require('./../../ddd/model');
import factory = require('./../../ddd/factory');

//import rx = require('rx');
import mongodb = require('mongodb');

export class MongoDbRepository<TModel extends model.IdObject> implements repo.IRepository<model.IdObject> {
  /**
   * INheriting classes can use collection to access db.
   * @return {mongodb.Collection}
   */
  protected get collection():mongodb.Collection {
    return this._collection;
  }

  protected get db():mongodb.Db {
    return this._db;
  }

  protected get factory():factory.IFactory<TModel> {
    return this._factory;
  }

  private _configuration:any;
  private _factory:factory.IFactory<TModel>;

  private _db: mongodb.Db = null;
  private _collection: mongodb.Collection = null;


  constructor(configuration: any, factory: factory.IFactory<TModel>) {
    this._configuration = configuration;
    this._factory = factory;
  }

  public Init(cb: (err: Error) => void, dropCollections?: boolean): void {

    var that = this;

    console.log("Mongo connecting [" + that._configuration.mongodb_url + "]");

    mongodb.MongoClient.connect(that._configuration.mongodb_url, function(err, db) {

      if (err != null) {
        console.log("Mongo connection failed[" + that._configuration.mongodb_url + "]");
        cb(err);
        return;
      }

      console.log("Mongo connected [" + that._configuration.mongodb_url + "]");
      that._db = db;

      // get collection users
      var col = that._db.collection(that._configuration.collectionName);
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
          that._db.dropCollection(that._configuration.collectionName, function(err, col) {
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

  public Find(cb:repo.Func2<Error, TModel[], void>):void {
  if (!this._collection)
    {
      throw new Error('Not initialized');
    }

    var that = this;

    //// fidn all items
    this._collection.find({}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        //console.log(item);
        models.push(that._factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }

  public Insert(object:TModel, cb: (err: Error) => void): void {
    //console.log(JSON.stringify(object));

    this._collection.insertOne(this._factory.ToMongoDocument(object), function(err, result) {
      console.log("result["  + result + "]");
      cb(err);
    });
  }

  private CreateCollection(cb: (err: Error, col: mongodb.Collection) => void) {
    var that = this;
    this._db.createCollection(this._configuration.collectionName, function(err, col) {
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