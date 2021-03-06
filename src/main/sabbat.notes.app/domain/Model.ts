/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import rx = require('rx');
import url = require('url');

import {IdObject} from "../common/ddd/model";
import {Id} from "../common/ddd/model";
import {Url} from "url";

//namespace sabbat {
  export class Note extends IdObject {
    public get ownerId(): Id {
      return this._ownerId;
    }

    public get sharedUserIds(): string[] {
      return this._sharedUserIds;
    }

    public set sharedUserIds(value: string[]) {
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

    private _ownerId:Id;

    private _sharedUserIds: string[];

    constructor(id: Id, ownerId: Id, title?:string, content?:string) {
      super(id);
      this._ownerId = ownerId;
      this._title = title;
      this._content = content;
    }

    /**
     * Adds shared users to existing shared user ids.
     * @param userIds ids to add to collection.
     */
    addSharedUsers(userIds: string[]):void {
      userIds.forEach((item, n, items) => {
        items.push(item);
      });
    }
  }
//} // end of ns 'sabbat'