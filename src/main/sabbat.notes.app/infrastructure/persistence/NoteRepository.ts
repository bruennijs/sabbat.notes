/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="./../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo = require('./MongoDbRepository');
import model = require('./../../domain/Model');
import fac = require('./../../common/ddd/factory');
import dddModel = require('./../../common/ddd/model');
import _ = require('underscore');

import mongodb = require('mongodb');

export class NoteRepository extends repo.MongoDbRepository<model.Note> {

  constructor(configuration: any, factory: fac.IFactory<model.Note>) {
    _.extend(configuration, {collectionName: 'notes'}); // extend collection name base shall use
    super(configuration, factory);
  }

  public FindByUser(userId: dddModel.IdObject, cb:(error: Error, obj: model.Note[]) => void):void {
    //// fidn all items
    this.collection.find({userId: userId.toString()}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        //console.log(item);
        models.push(this.factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }

/*  GetRx(): rx.IObservable<model.Note> {
    return null;
  }*/
}
