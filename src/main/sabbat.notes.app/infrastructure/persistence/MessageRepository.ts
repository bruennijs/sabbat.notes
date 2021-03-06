/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import _ = require('underscore');

import mongodb = require('mongodb');

import {Message} from "../../domain/message/Message";
import {MongoDbRepository} from "../../common/infrastructure/persistence/MongoDbRepository";

export class MessageRepository extends MongoDbRepository<Message> {
  public dependencies;

  constructor() {
    super(null, null, "messages");
    this.dependencies = "configuration=appConfig,factory=messageFactory";
  }

/*  public FindBy(userId: string, cb:(error: Error, obj: model.Message[]) => void):void {

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
  }*/
}
