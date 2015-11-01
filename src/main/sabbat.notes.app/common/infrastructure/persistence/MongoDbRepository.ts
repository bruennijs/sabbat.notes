/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="../../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>
///<reference path="../../../node_modules/rx/ts/rx.all.d.ts" />

import repo    = require('./../../ddd/persistence');
import model   = require('./../../ddd/model');
import factory = require('./../../ddd/factory');

import rx = require('rx');
import mongodb = require('mongodb');

export class MongoDbRepository<TModel extends model.IdObject> implements repo.IRepository<model.IdObject> {
  public set configuration(value:any) {
    this._configuration = value;
  }
  public get configuration():any {
    return this._configuration;
  }

  public set factory(value:factory.IFactory<TModel>) {
    this._factory = value;
  }

  public get factory():factory.IFactory<TModel> {
    return this._factory;
  }

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

  private _configuration:any;
  private _factory:factory.IFactory<TModel>;

  private _db: mongodb.Db = null;
  private _collection: mongodb.Collection = null;
  private _collectionName:string;

  constructor(configuration: any, factory: factory.IFactory<TModel>, collectionName: string) {
    this._configuration = configuration;
    this._factory = factory;
    this._collectionName = collectionName;
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

  public Insert(object: TModel): rx.IObservable<TModel> {
    //console.log(JSON.stringify(object));
    var insertOne = rx.Observable.fromNodeCallback(this._collection.insertOne, this._collection);

    return insertOne(this._factory.ToMongoDocument(object)).select(function(mongoResult: any)
    {
      return object;
    });
  }

  /**
   * Updates document in db by primary id.
   * @param object
   * @returns {any}
   * @constructor
   */
  public Update(object: TModel): rx.IObservable<TModel> {
    //console.log(JSON.stringify(object));
    var updateOne = rx.Observable.fromNodeCallback(this._collection.updateOne, this._collection);

    return updateOne({_id: new mongodb.ObjectID(object.toString())}, this._factory.ToMongoDocument(object)).select(function(mongoResult: any)
    {
      return object;
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

  nextId():model.Id {
    return new model.Id(new mongodb.ObjectID().toString());
  }

  /**
   * Gets document where _id === parameter.id
   * @param id
   * @returns {ReplaySubject<T>}
   * @constructor
   */
  GetById(id: model.Id): Rx.IObservable<TModel> {
    var subject = new Rx.ReplaySubject<TModel>();

    this.collection
        .find({_id: new mongodb.ObjectID(id.toString())})
        .toArray(function(err, objs)
        {
          if(!err) {
            subject.onNext(objs[0]);
            subject.onCompleted();
          }
          else
            subject.onError(err);
        });

    return subject;
  }
}
