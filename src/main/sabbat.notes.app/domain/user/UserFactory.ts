/**
 * Created by bruenni on 24.09.15.
 */

import mongodb = require('mongodb');
import _ = require('underscore');
import {IFactory} from "../../common/ddd/factory";
import {User} from "../Model";

export class UserFactory implements IFactory<User> {

  public create() {

  }

  ToMongoDocument(obj: User): any
  {
    return {
      _id: new mongodb.ObjectID(obj.id.value),
      name: obj.name
    }
  }

  CreateFromMongoDocument(document: any): User {
    return new User(document._id, document.name, document.email);
  }
}


