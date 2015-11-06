/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import repo = require("./../../common/infrastructure/persistence/MongoDbRepository");
import model = require("./../../domain/Model");
import fac = require("./../../common/ddd/factory");
// import dddModel = require("./../../common/ddd/model");
//import _ = require("underscore");

import mongodb = require("mongodb");

export class UserRepository extends repo.MongoDbRepository<model.User> {
  private dependencies;

  constructor() {
    super(null, null, "users");
    this.dependencies = "configuration=appConfig,factory=userFactory";
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
