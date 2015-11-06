/**
 * Created by bruenni on 24.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import _ = require('underscore');

import mongodb = require('mongodb');
import {Note} from "../../domain/Model";
import {IFactory} from "../../common/ddd/factory";
import {MongoDbRepository} from "../../common/infrastructure/persistence/MongoDbRepository";

export class NoteRepository extends MongoDbRepository<Note> {

  constructor(configuration: any, factory: IFactory<Note>) {
    super(configuration, factory, "notes");
  }

  public FindByOwner(userId: string, cb:(error: Error, obj: Note[]) => void):void {

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
