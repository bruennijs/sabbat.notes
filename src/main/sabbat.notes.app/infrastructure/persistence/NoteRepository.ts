/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo = require('./../../common/infrastructure/persistence/MongoDbRepository');
import model = require('./../../domain/Model');
import fac = require('./../../common/ddd/factory');
import dddModel = require('./../../common/ddd/model');
import _ = require('underscore');

import mongodb = require('mongodb');

export class NoteRepository extends repo.MongoDbRepository<model.Note> {

  constructor(configuration: any, factory: fac.IFactory<model.Note>) {
    super(configuration, factory, "notes");
  }

  public FindByOwner(userId: string, cb:(error: Error, obj: model.Note[]) => void):void {

    var that = this;

    //// fidn all items
    this.collection.find({ownerId: new mongodb.ObjectID(userId)}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        models.push(that.factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }
}
