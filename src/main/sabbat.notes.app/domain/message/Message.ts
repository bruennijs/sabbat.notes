/**
 * Created by bruenni on 23.09.15.
 */

import model = require('./../../common/ddd/model');
import rx = require('rx');
import url = require('url');

  /**
   * A message can have the state 'Sent' when the user has sent a message to the to user.
   * When the message was delivered to the to user (e.g. was not online when sent) the message
   * will transition to the Delivered state
   */
  export enum MessageState {
    None,
    Sent,
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
     * @param fromUserId
     * @param toUserId
     * @param content
     */
    constructor(id:model.Id, fromUserId:model.Id, toUserId:model.Id, content:string, state?: MessageState) {
      super(id);
      this._from = fromUserId;
      this._to = toUserId;
      if (state === undefined) {
        this._currentState = MessageState.None;
      }
      else
      {
        this._currentState = state;
      }
      this._content = content;
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