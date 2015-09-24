/**
 * Created by bruenni on 23.09.15.
 */

/**
 * Repository interfaces
 */

/// <reference path="../../node_modules/DefinitelyTyped/node/node-0.10.d.ts" />
/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />

import rx = require('rx');  /// this is a "declare module" section of a d.ts file where several modules are declared

import model = require('./model');  /// this is a ts file where symbols are exported

export interface Func1<T1, TResult> {
  (arg1?:T1): TResult;
}

export interface Func2<T1, T2, TResult> {
  (arg1?:T1, arg2?:T2): TResult;
}

export interface IRepository<TModel extends model.IdObject>  {
  /**
   * Gets all users.
   * @constructor
   */
  Get(cb?:Func2<Error, TModel[], void>): void;

  /**clear
   * Inserts row in database
   * @param object
   * @constructor
   */
  Insert(object: TModel, cb: (err: Error, model: TModel) => void): void;
}
