/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

//import _ = require("underscore");

import rx = require("rx");
import mongodb = require("mongodb");

import {MongoDbRepository} from "../../common/infrastructure/persistence/MongoDbRepository";
import {User} from "../../domain/Model";

export class UserRepository extends MongoDbRepository<User> {
  private dependencies;

  constructor() {
    super(null, null, "users");
    this.dependencies = "configuration=appConfig,factory=userFactory";
  }

  /**
   * Finds user in database. When not found emoty array is returned
   * @param name
   * @returns {ReplaySubject<T>}
   * @constructor
   */
  public FindByName(name: string): rx.Observable<User[]> {

    var that = this;

    var subject = new rx.ReplaySubject<User[]>();

    //// fidn all items
    this.collection.find({name: name}).toArray(function(err, objs) {

      if (!err)
      {
        subject.onNext(objs.map<User>(function(o, n, array) {
          return that.factory.CreateFromMongoDocument(o);
        }));
        subject.onCompleted();
      }
      else
      {
        subject.onError(err);
      }
    });

    return subject;
  }
}
