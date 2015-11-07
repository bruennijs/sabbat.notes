/**
 * Created by bruenni on 19.10.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import url = require('url');
import rx = require('rx');

import {User} from "../domain/Model";
import {UserRepository} from "../infrastructure/persistence/UserRepository";
import {Url} from "url";

export class MembershipService {
  private dependencies;

  public get Repository(): UserRepository {
    return this._repository;
  }

  public set Repository(value:UserRepository) {
    this._repository = value;
  }
  private _repository: UserRepository;

  /**
   * Constructor
   */
  constructor()
  {
    this.dependencies = "_repository=userRepository";
  }

  /**
   * Creates a user stores to repo and publishes domain events.
   * @param name
   * @param email
   * @returns {rx.IObservable<User>}
   */
  createUser(name: string, email: Url): rx.Observable<User> {
    var newId = this._repository.nextId();

    var newUser = new User(newId, name, email);

    return this._repository.Insert(newUser);
  }
};