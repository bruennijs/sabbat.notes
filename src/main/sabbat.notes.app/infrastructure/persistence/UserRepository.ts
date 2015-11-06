/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

//import _ = require("underscore");

import mongodb = require("mongodb");

import {MongoDbRepository} from "../../common/infrastructure/persistence/MongoDbRepository";
import {User} from "../../domain/Model";

export class UserRepository extends MongoDbRepository<User> {
  private dependencies;

  constructor() {
    super(null, null, "users");
    this.dependencies = "configuration=appConfig,factory=userFactory";
  }

  public FindByName(name: string, cb:(error: Error, obj: User[]) => void):void {

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
