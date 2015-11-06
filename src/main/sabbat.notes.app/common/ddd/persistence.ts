/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />


import rx = require('rx');

import {IdObject, Id} from "./model";

export interface Func1<T1, TResult> {
  (arg1?:T1): TResult;
}

export interface Func2<T1, T2, TResult> {
  (arg1?:T1, arg2?:T2): TResult;
}

export interface IRepository<TModel extends IdObject>  {

  /**
   * Get by id
   */
  GetById(id: Id): rx.IObservable<TModel>;

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
  nextId(): Id;
}
