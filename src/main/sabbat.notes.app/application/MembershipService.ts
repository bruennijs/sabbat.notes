/**
 * Created by bruenni on 19.10.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import url = require('url');
import rx = require('rx');

import {UserRepository} from "../infrastructure/persistence/UserRepository";
import {Url} from "url";
import IObservable = Rx.IObservable;
import {User} from "../domain/user/User";

/**
 * Thrown in login process if user password did not match.
 */
export class AuthenticationError extends Error {

  /**
   * user name that raised login error.
   * @returns {any}
   */
  get userName() {
    return this._userName;
  }
  private _userName;

  /**
   * Constructor
   * @param userName
   * @param message
   */
  constructor(userName: string, message: string)
  {
    super(message);
    this._userName = userName;
  }

  /**
   * to string.
   * @returns {string}
   */
  public toString(): string {
    return this.message + "[user=" + this._userName + "]";
  }
}

/**
 * Application service for membership logic.
 */
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
  public createUser(name: string, email: Url): rx.Observable<User> {
    var newId = this._repository.nextId();

    var newUser = new User(newId, name, url.format(email));

    return this._repository.Insert(newUser);
  }

  /**
   * Login finds user by name and checks password.
   * If user is not found null is returned.
   * If found but password does not match error of type AuthenticationError is thrown (see
   * message text for details)
   * @param userName
   * @param password
   */
  public login(userName: string, password: string): rx.Observable<User>  {

    return this._repository.FindByName(userName)
                    .select(function (users: User[]) {
                      //// set user used in subsequent middleware functions
                      if (users && users.length > 0) {
                        var user = users[0];

                        if (!user.checkPassword(password)) {
                          throw new AuthenticationError(userName, "authenitication error");
                        }

                        return user;
                      }

                      return null;
                    });
  }
};