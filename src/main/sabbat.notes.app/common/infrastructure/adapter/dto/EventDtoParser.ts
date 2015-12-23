/**
 * Created by bruenni on 19.12.15.
 */

import {} from "underscore";
import {IDomainEvent} from "./../../../ddd/event";

/**
 * Creates message dtos from domain models
 */
export class DomainEventDtoParser {

  /**
   * Creates DTO from domain object.
   * @param msg
   * @returns {MessageDto}
   */
  serialize(dtoObject: any, event: IDomainEvent): void {
    dtoObject["context"] = event.context;
    dtoObject["name"] = event.name;
    dtoObject["content"] = {};
  }

  /**
   * Adds object to event content property.
   * @param content
   */
  addContent(objectAddTo: any, content: any):void {
    _.extend(objectAddTo.content, content);
  }
};
