/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../../node_modules/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../../node_modules/DefinitelyTyped/underscore/underscore.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');
import _ = require('underscore');

/**
 * Entity id object
 */
export class Id {
  public get value():string {
    return this._value;
  }

  private _value:string;

  constructor(value: string) {
    this._value = value;
  }

  public toString(): string {
      return this._value;
  }
}

  /**
   * Created by bruenni on 16.08.15.
   */
export class IdObject {
    public get id() {
      return this._id;
    }

    private _id: Id;

    constructor(id: Id) {
      this._id = id;
    }

    /**
     * Parses json content to IdObject
     * @param json
     * @returns {*}
     * @constructor
     */
    static Parse(json: string):IdObject {
      var obj = JSON.parse(json);
      ///util.inherits(model, Models.IdObject); //// no, only copies prototype's function into a constructor's prototype
      //return _.create(IdObject.prototype, obj);
        return null;
    }

    /**
     * loads properties from json to this instance.
     */
    load(obj: any): void
    {
      _.extend(this, obj);
    }

    /*
     * loads from string.
     */
    loadFrom(json: string)
    {
      this.load(JSON.parse(json));
    }

    toString(): string
    {
      return this._id.toString();
    }
  }
