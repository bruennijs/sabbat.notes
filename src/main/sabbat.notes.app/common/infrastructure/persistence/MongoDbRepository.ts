/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../../typings/tsd.d.ts" />

import repo    = require('./../../ddd/persistence');
import model   = require('./../../ddd/model');
import factory = require('./../../ddd/factory');

import rx = require('rx');
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

  public  configuration:any;
  public factory:factory.IFactory<TModel>;

  private _db: mongodb.Db = null;
  private _collection: mongodb.Collection = null;
  private _collectionName:string;

  constructor(configuration: any, factory: factory.IFactory<TModel>, collectionName: string) {
    this.configuration = configuration;
    this.factory = factory;
    this._collectionName = collectionName;
  }

  public Init(dropCollections?: boolean): rx.IObservable<void> {

    var that = this;

    var subject = new rx.ReplaySubject<void>();

    //console.log("Mongo connecting [" + that.configuration.mongodb_url + "]");

    mongodb.MongoClient.connect(that.configuration.mongodb_url, function(err, db) {

      if (err != null) {
        console.log("Mongo connection failed[" + that.configuration.mongodb_url + "]");
        subject.onError(err)
        return;
      }

      //console.log("Mongo connected [" + that.configuration.mongodb_url + "]");
      that._db = db;

      // get collection users
      var col = that._db.collection(that._collectionName);
      if (!col)
      {
        // create new collection
        that.CreateCollection(function(err, col) {
          if (!err)
          {
            subject.onCompleted();
          }
          else
          {
            subject.onError(err);
          }
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
              if (!err)
              {
                subject.onCompleted();
              }
              else
              {
                subject.onError(err);
              }
            });
          });
        }
        else {
          that._collection = col;
          subject.onCompleted();
        }
      }
    });

    return subject;
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
        models.push(that.factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }

  public Insert(object: TModel): rx.IObservable<TModel> {
    //console.log(JSON.stringify(object));
    var insertOne = rx.Observable.fromNodeCallback(this._collection.insertOne, this._collection);

    return insertOne(this.factory.ToMongoDocument(object)).select(function(mongoResult: any)
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

    return updateOne({_id: new mongodb.ObjectID(object.toString())}, this.factory.ToMongoDocument(object)).select(function(mongoResult: any)
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
    var subject = new rx.ReplaySubject<TModel>();

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