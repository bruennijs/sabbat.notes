/**
 * Created by bruenni on 23.09.15.
 */

/**
 * Repository interfaces
 */

/// <reference path="../../node_modules/DefinitelyTyped/node/node.d.ts" />

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
   * Get by id
   */
  GetById(id: model.Id): rx.IObservable<TModel>;

  /**
   * Gets all users.
   * @constructor
   */
  Find(cb:Func2<Error, TModel[], void>): void;

  /**clear
   * Inserts row in database
   * @param object
   * @constructor
   */
  Insert(object: TModel): rx.IObservable<TModel>;

  /**
   * Generates next id.
   */
  nextId(): model.Id;
}
