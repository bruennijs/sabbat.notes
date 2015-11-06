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

  /**
   * Message sent by users
   */
  export class Message extends IdObject {
    public get deliveryUsers():Id[] {
      return this._deliveryUsers;
    }
    private _deliveryUsers: Id[];

    public get content() {
      return this._content;
    }

    private _content;

    public get currentState() {
      return this._currentState;
    }

    /**
     * Getter to-
     * @returns {any}
     */
    public get to() {
      return this._to;
    }

    private _to;

    /**
     * Getter from.
     * @returns {any}
     */
    public get from() {
      return this._from;
    }

    private _from;

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
    constructor(id:Id, fromId?:Id, toId?:Id, content?:string, state?: MessageState) {
      super(id);;

      this._currentState = state;
      this._content = content;
      this._from = fromId;
      this._to = toId;
    }

    /**
     * Sends a message to the specified 
     * @param fromUserId
     * @param to user to send
     * @param content content data.
     */
    public create(from: User, to: User, content: string): IDomainEvent[] {
      this._to = to.id
      this._from = from.id;
      this._content = content;
      this._currentState = MessageState.Delivering;

      return [new MessageCreatedEvent(this.id, from.id, to.id, content)];
    }

    /**
     * Handler for MessageDeliveredEvent
     * @param event
     */
    public delivered(event: MessageDeliveredEvent): void {
      this._deliveryUsers.push(event.toUserId);
      this._currentState = MessageState.Delivered;
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