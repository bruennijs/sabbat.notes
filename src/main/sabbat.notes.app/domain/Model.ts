/**
 * Created by bruenni on 23.09.15.
 */

import model = require('./../common/ddd/model');

export class Note extends model.IdObject {
  public get content() {
    return this._content;
  }

  private _content;

  public get title() {
    return this._title;
  }

  private _title;

  constructor(id: string, title: string, content: string)
  {
    super(id);
    this._title = title;
    this._content = content;
  }
}
