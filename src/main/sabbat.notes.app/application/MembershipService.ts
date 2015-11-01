/**
 * Created by bruenni on 19.10.15.
 */

import repository = require('./../infrastructure/persistence/UserRepository');
import user = require('./../domain/Model');
import dddModel = require('./../common/ddd/model');

/// <reference path="../node_modules/DefinitelyTyped/node/Node.d.ts" />
import url = require('url');
/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />
import rx = require('rx');

export class MembershipService {
  private dependencies;
  public get userRepository():repository.UserRepository {
    return this._userRepository;
  }

  public set userRepository(value:repository.UserRepository) {
    this._userRepository = value;
  }
  private _userRepository:repository.UserRepository;

  constructor()
  {
    this.dependencies = "userRepository";
  }

  /**
   * Creates a user stores to repo and publishes domain events.
   * @param name
   * @param email
   * @returns {rx.IObservable<User>}
   */
  createUser(name: string, email: url.Url): rx.IObservable<user.User> {
    var newId = this._userRepository.nextId();

    var user = new user.User(newId, name, email);

    return this._userRepository.Insert(user);
  }
};