/**
 * Created by bruenni on 23.09.15.
 */

import model = require('./../common/ddd/model');

export class Note extends model.IdObject {
  public get Content() {
    return this.content;
  }

  private content;

  public get Title() {
    return this.title;
  }

  private title;

  constructor(id?: string, title?: string, content?: string)
  {
    super(id);
    this.title = title;
    this.content = content;
  }
}
