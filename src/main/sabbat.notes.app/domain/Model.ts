/**
 * Created by bruenni on 23.09.15.
 */

import model = require('./../common/ddd/model');

export class Note extends model.IdObject {
  public get ownerId():string {
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

  private _ownerId: string;

  private _sharedUserIds: string[];

  constructor(id: string, ownerId: string, title?: string, content?: string)
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
  public get name() {
    return this._name;
  }
  private _name;

  constructor(id: string, name: string)
  {
    super(id);
    this._name = name;
  }
}
