/**
 * Created by bruenni on 18.10.15.
 */

import model = require("./model");

export interface IFactory<TModel extends model.IdObject> {
  /**
   * Creates a domain model from persistence document.
   * @param document
   * @return Created model
   */
  CreateFromMongoDocument(document: any): TModel;

  /**
   *Converts a domain model to mongo document.
   * @param obj domain model to convert.
   * @returns Mongo js object.
   */
  ToMongoDocument(obj: TModel): any;
}