/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import model = require('./../common/ddd/model');

import msg = require('./message/Message');

import rx = require('rx');
import url = require('url');

//namespace sabbat {
  export class Note extends model.IdObject {
    public get ownerId():model.Id {
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

    private _ownerId:model.Id;

    private _sharedUserIds:string[];

    constructor(id:model.Id, ownerId:model.Id, title?:string, content?:string) {
      super(id);
      this._ownerId = ownerId;
      this._title = title;
      this._content = content;
    }

    /**
     * Adds shared users to existing shared user ids.
     * @param userIds ids to add to collection.
     */
    addSharedUsers(userIds:string[]):void {
      userIds.forEach((item, n, items) => {
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

    constructor(id:model.Id, name: string, email:url.Url) {
      super(id)
      this._name = name;
      this._email = email;
    }
  }
//} // end of ns 'sabbat'