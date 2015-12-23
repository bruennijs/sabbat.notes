/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');
import {IFactory} from "../../common/ddd/factory";
import {Id} from "../../common/ddd/model";
import {ObjectID} from "mongodb";
import {User} from "./User";

export class UserFactory implements IFactory<User> {

  public create() {

  }

  /**
   * Serializes domain model to mongodb document.
   * primary ids become ObjectID objects (12 byte bson)
   * @param obj
   * @returns {{_id: "mongodb".ObjectID, name: *, email: string}}
   * @constructor
   */
  ToMongoDocument(obj: User): any
  {
    return {
      _id: new ObjectID(obj.id.value),
      name: obj.name,
      email: obj.email.toString()
    }
  }

  /**
   * Deserializes from mongodb document.
   * @param document
   * @returns {User}
   * @constructor
   */
  CreateFromMongoDocument(document: any): User {
    return new User(Id.parse(document._id.toHexString()), document.name, document.email);
  }
}


