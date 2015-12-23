/**
 * Created by bruenni on 20.12.15.
 */

import {IDomainEvent} from "../../../common/ddd/event";
import {Id} from "../../../common/ddd/model";
import {DomainEventDtoParser} from "../../../common/infrastructure/adapter/dto/EventDtoParser";
import {Message, MessageState, Destination, DestinationType} from "../../../domain/message/Message";
import {MessageReceivedEvent, MessageReceiveAcknowledgedEvent, MessageContextName} from "../../../domain/message/MessageEvents";

/**
 * Container of DTO data transferred to rabbitmq clients, REST clients)
 */
//export class MessageDto {
//  public get toId():string {
//    return this._toId;
//  }
//  public get state():string {
//    return this._state;
//  }
//  public get content():string {
//    return this._content;
//  }
//  public get id():string {
//    return this._id;
//  }
//  public get fromId():string {
//    return this._fromId;
//  }
//  private _id:string;
//  private _fromId:string;
//  private _toId:string;
//  private _content:string;
//  private _state:string;
//
//  /**
//   * Constructor
//   * @param id
//   * @param fromId
//   * @param toId
//   * @param content
//   */
//  constructor(id: string, state: string, fromId: string, toId: string, content: string) {
//    this._id = id;
//    this._state = state;
//    this._fromId = fromId;
//    this._toId = toId;
//    this._content = content;
//  }
//}

/**
 * Parses/seriallizes into a generic DTO (e.g. needed in rabbitmq, REST interfaces)
 */
export class MessageDtoParser {

  /**
   * Serializes to DTO
   * @param msg
   * @returns {{id: string, state: MessageState, from: string, to: string, content: *, date: Date}}
   */
  serialize(dtoObject: any, domainObject: Message): void {
    dtoObject["id"] = domainObject.id.value;
    dtoObject["state"] = MessageState[domainObject.currentState];
    dtoObject["from"] = domainObject.from.value;
    dtoObject["to"] = domainObject.destination.to.value;
    dtoObject["destinationType"] = domainObject.destination.type;
    dtoObject["deliveryDate"] = domainObject.deliveryDate !== undefined ? domainObject.deliveryDate.toISOString() : null;
    dtoObject["content"] = domainObject.content;
  }

  /**
   * Parses message DTO to message instance again
   * @param dto
   */
  parse(dto: any): Message {
    return new Message(dto["id"],
        Id.parse(dto["from"]),
        new Destination(Id.parse(dto["to"]),
            DestinationType[<string>dto["destinationType"]]),
            dto("content"),
            MessageState[<string>dto.state],
            (dto.deliveryDate !== undefined) ? new Date(Date.parse(<string>dto.deliveryDate)) : null);
  }
}


/**
 * Creates message dtos from domain models
 */
export class MessageEventDtoParser {

  private domainEventDtoParser: DomainEventDtoParser = new DomainEventDtoParser();
  private messageDtoParser: MessageDtoParser = new MessageDtoParser();

  /**
   * Creates DTO from domain object.
   * @param msg
   * @returns {MessageDto}
   */
  serialize(event:IDomainEvent): any {

    var dtoObject = {};

    this.domainEventDtoParser.serialize(dtoObject, messageReceivedEvent);

    if (event instanceof MessageReceivedEvent)
    {
      var messageReceivedEvent = event as MessageReceivedEvent;

      this.domainEventDtoParser.addContent(dtoObject, this.messageDtoParser.serialize(dtoObject, messageReceivedEvent.message));
    }
  }

  /**
   * Creates DTO from domain object.
   * @param msg
   * @returns {MessageDto}
   */
  parse(dto: any): IDomainEvent {
    if (dto.context === MessageContextName)
    {
      if (dto.name === MessageReceivedEvent.Name)
      {
        return new MessageReceivedEvent(this.messageDtoParser.parse(dto.content));
      }
    }

    return null;
  }
};

/**
 * Creates message dtos from domain models
 */
//export class MessageDtoFactory {
//
//  /**
//   * Creates DTO from domain object.
//   * @param msg
//   * @returns {MessageDto}
//   */
//  create(msg:Message): MessageDto {
//    return new MessageDto(msg.id.toString(), MessageState[msg.currentState], msg.from.toString(), msg.destination.to.toString(), msg.content);
//  }
//};
