/**
 * Created by bruenni on 23.09.15.
 */

import model = require('./../../common/ddd/model');
import user = require('./../Model');
import events = require('./MessageEvents');
import dddEvents = require('./../../common/ddd/event');
import rx = require('rx');
import url = require('url');

  /**
   * A message can have the state 'Sent' when the user has sent a message to the to user.
   * When the message was delivered to the to user (e.g. was not online when sent) the message
   * will transition to the Delivered state
   */
  export enum MessageState {
    Created,
    Delivering,
    Delivered
  }
  ;

  /**
   * Message sent by users
   */
  export class Message extends model.IdObject {

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
    constructor(id:model.Id, fromId:model.Id, toId:model.Id, content:string, state: MessageState) {
      super(id);;

      this._currentState = state;
      this._content = content;
      this._from = fromId;
      this._to = toId;
    }

    /**
     * Sends a message to the specified user.
     * @param fromUserId
     * @param to user to send
     * @param content content data.
     */
    public create(from: user.User, to: user.User, content: string): dddEvents.IDomainEvent[] {
      this._to = to.id
      this._from = from.id;
      this._content = content;
      this._currentState = MessageState.Delivering;

      return [new events.MessageCreatedEvent(this.id, from.id, to.id, content)];
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