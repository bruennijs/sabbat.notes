/**
 * Created by bruenni on 19.10.15.
 */

import repository = require('./../infrastructure/persistence/UserRepository');
import models = require('./../domain/Model');
import model = require('./../common/ddd/model');

/// <reference path="./../node_modules/DefinitelyTyped/urijs/URIjs.d.ts" />
import uri = require("urijs");

export class UserService {
  private _userRepository:repository.UserRepository;

  constructor(userRepository: repository.UserRepository)
  {
    this._userRepository = userRepository;
  }

  createUser(name: string, email: uri.URI, cb: (error: Error, id: model.Id) => void): void {
    var newId = this._userRepository.nextId();

    var user = new models.User(newId, name);

    this._userRepository.Insert(user, function(err, model) {
      cb(err, model.id);
    });
  }
};