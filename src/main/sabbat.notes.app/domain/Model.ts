/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />

import model = require('./../common/ddd/model');
import rx = require('rx');

export class Note extends model.IdObject {
  public get ownerId(): model.Id {
    return this._ownerId;
  }

  public get sharedUserIds():string[] {
    return this._sharedUserIds;
  }

  public set sharedUserIds(value:string[]) {
    this._sharedUserIds = value;
  }

  public get content() {
    return this._content;
  }

  private _content;

  public get title() {
    return this._title;
  }

  private _title;

  private _ownerId: model.Id;

  private _sharedUserIds: string[];

  constructor(id: model.Id, ownerId: model.Id, title?: string, content?: string)
  {
    super(id);
    this._ownerId = ownerId;
    this._title = title;
    this._content = content;
  }

  /**
   * Adds shared users to existing shared user ids.
   * @param userIds ids to add to collection.
   */
  addSharedUsers(userIds: string[]): void
  {
    userIds.forEach((item, n, items) =>
    {
      items.push(item);
    });
  }
}

/**
 * User entity
 */
export class User extends model.IdObject {
  public get email() {
    return this._email;
  }

  private _email;
  public get name() {
    return this._name;
  }
  private _name;

  constructor(id: model.Id, name: string, email: string)
  {
    super(id)
    this._name = name;
    this._email = email;
  }

  /**
   * Sends a message to the specified user.
   * @param toUser
   * @returns Async observable with result with the success of the
   * sending.
   */
  sendMessage(toUser: User): rx.IObservable<SendMessageResult> {
    return null;
  }
}

/**
 * A message can have the state 'Sent' when the user has sent a message to the to user.
 * When the message was delivered to the to user (e.g. was not online when sent) the message
 * will transition to the Delivered state
 */
export enum MessageState {
  Sent,
  Delivered
};

/**
 * Message sent by users
 */
export class Message extends model.IdObject {
  public get currentState() {
    return this._currentState;
  }

  /**
   * Getter to-
   * @returns {any}
   */
  public get to() {
    return this._to;
  }
  private _to;

  /**
   * Getter from.
   * @returns {any}
   */
  public get from() {
    return this._from;
  }
  private _from;

  private _currentState;

  /**
   * Constructor
   * @param id
   * @param fromUserId
   * @param toUserId
   */
  constructor(id: model.Id, fromUserId: model.Id, toUserId: model.Id) {
    super(id);
    this._from = fromUserId;
    this._to = toUserId;
    this._currentState = MessageState.Sent;
  }
}

/**
 * Sent message result.
 */
export class SendMessageResult {
  /**
   * Message sent or delivered
   * @returns {any}
   */
  public get msg() {
    return this._msg;
  }

  private _msg;

  /**
   * Constructor.
   * @param msg
   */
  constructor(msg: Message) {
    this._msg = msg;
  }
}
