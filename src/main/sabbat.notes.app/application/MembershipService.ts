/**
 * Created by bruenni on 19.10.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import url = require('url');
import rx = require('rx');

import repository = require('./../infrastructure/persistence/UserRepository');
import user = require('./../domain/Model');
import dddModel = require('./../common/ddd/model');

export class MembershipService {
  private dependencies;

  public get Repository():repository.UserRepository {
    return this._repository;
  }

  public set Repository(value:repository.UserRepository) {
    this._repository = value;
  }
  private _repository: repository.UserRepository;

  /**
   * Constructor
   */
  constructor()
  {
    this.dependencies = "Repository=userRepository";
  }

  /**
   * Creates a user stores to repo and publishes domain events.
   * @param name
   * @param email
   * @returns {rx.IObservable<User>}
   */
  createUser(name: string, email: url.Url): rx.IObservable<user.User> {
    var newId = this._repository.nextId();

    var newUser = new user.User(newId, name, email);

    return this._repository.Insert(newUser);
  }
};