/**
 * Created by bruenni on 24.09.15.
 */

///<reference path="./../../node_modules/DefinitelyTyped/mongodb/mongodb.d.ts"/>

import repo = require('./../../common/infrastructure/persistence/MongoDbRepository');
import model = require('./../../domain/Model');
import fac = require('./../../common/ddd/factory');
import dddModel = require('./../../common/ddd/model');
import _ = require('underscore');

import mongodb = require('mongodb');

export class UserRepository extends repo.MongoDbRepository<model.User> {

  constructor(configuration: any, factory: fac.IFactory<model.User>) {
    _.extend(configuration, {collectionName: 'notes'}); // extend collection name base shall use
    super(configuration, factory);
  }

  public FindByName(name: string, cb:(error: Error, obj: model.User[]) => void):void {

    var that = this;

    //// fidn all items
    this.collection.find({name: name}).toArray(function(err, objs) {

      var models = [];

      //model.Note.Parse
      objs.forEach(function(item, n, ar) {
        models.push(that.factory.CreateFromMongoDocument(item));
      });

      cb(err, models);
    });
  }
}
