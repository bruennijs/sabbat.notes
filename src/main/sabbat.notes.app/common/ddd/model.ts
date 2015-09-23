/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../../node_modules/DefinitelyTyped/node/node-0.10.d.ts" />
/// <reference path="../../node_modules/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');
import _ = require('underscore');
import rx = require('rx');

  /**
   * Created by bruenni on 16.08.15.
   */
export class IdObject {
    public get id() {
      return this._id;
    }

    private _id:string;

    constructor(id:string) {
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
      return _.create(IdObject.prototype, obj);
    }
  }
