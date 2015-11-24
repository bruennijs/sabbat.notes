///<reference path="MessageEvents.ts"/>
/**
 * Created by bruenni on 23.09.15.
 */

import rx = require('rx');
import url = require('url');

import {IdObject, Id} from "../../common/ddd/model";
import {MessageDeliveredEvent} from "./MessageEvents";
import {MessageCreatedEvent} from "./MessageEvents";
import {IDomainEvent} from "../../common/ddd/event";
import {User} from "../Model";
import {IEventHandler} from "../../common/ddd/event";
import {Handler} from "express";
import {MessageDeliveryRequestedEvent} from "./MessageEvents";

  /**
   * A message can have the state 'Sent' when the user has sent a message to the to 
   * When the message was delivered to the to user (e.g. was not online when sent) the message
   * will transition to the Delivered state
   */
  export enum MessageState {
    Created,
    Delivering,
    Delivered
  };

/***
 * Messages can be delivered to users or groups
 */
export enum DestinationType {
  User,
  Group
}


/**
 * Destination is of type user or group
 */
export class Destination {
  set To(value:Id) {
    this._To = value;
  }
  get Type():DestinationType {
    return this._Type;
  }

  set Type(value:DestinationType) {
    this._Type = value;
  }

  get To(): Id {
    return this._To;
  }

  private _To:Id;

  private _Type: DestinationType = DestinationType.User;

  /**
   * Constructor
   * @param To
   * @param Type
   */
  constructor(to:Id, Type:DestinationType) {
    this._To = to;
    this._Type = Type;
  }
}

  /**
   * Message sent by users
   */
  export class Message extends IdObject implements IEventHandler<IDomainEvent> {
    get deliveryDate() {
      return this._deliveryDate;
    }
    private _deliveryDate;

    get destination(): Destination {
      return this._destination;
    }

    private _destination: Destination;

    public get content() {
      return this._content;
    }

    private _content;

    public get currentState() {
      return this._currentState;
    }

    /**
     * Getter from.
     * @returns {any}
     */
    public get from() {
      return this._from;
    }

    private _from: Id;

    private _currentState;

    /**
     * Constructor
     * @param id
     * @param fromId
     * @param toId
     * @param toId
     * @param content
     * @param state
     * @param state
     */
    constructor(id: Id, fromId?: Id, destination?: Destination, content?:string, state?: MessageState) {
      super(id);

      this._currentState = state;
      this._content = content;
      this._from = fromId;
      this._destination = destination;
    }

    /**
     * Sends a message to the specified 
     * @param fromUserId
     * @param to user to send
     * @param content content data.
     */
    public create(from: User, to: User, content: string): IDomainEvent[] {

      var destination = new Destination(to.id, DestinationType.User);

      this._from = from.id;
      this._destination = destination;
      this._content = content;
      //this._currentState = MessageState.Created;

      var createdEvent = new MessageCreatedEvent(this.id, from.id, destination);

      var deliveryRequestedEvent = new MessageDeliveryRequestedEvent(this.id, this._from, this._destination.To, this._content);

      this._currentState = MessageState.Delivering;

      return [createdEvent, deliveryRequestedEvent];
    }

    /**
     * Handles message events
     * @param event
     * @constructor
     */
    Handle(event: IDomainEvent): void {
      if (event instanceof MessageDeliveredEvent)
      {
        this._deliveryDate = event.deliveredOn;
        this._currentState = MessageState.Delivered;
      }
    }
  }

/*  /!**
   * Sent message result.
   *!/
  export class SendMessageResult {
    /!**
     * Message sent or delivered
     * @returns {any}
     *!/
    public get msg() {
      return this._msg;
    }

    private _msg;

    /!**
     * Constructor.
     * @param msg
     *!/
    constructor(msg:Message) {
      this._msg = msg;
    }
  }*/