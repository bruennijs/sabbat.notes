///<reference path="../../common/ddd/event.ts"/>
/**
 * Created by bruenni on 25.10.15.
 */

import {Id} from "../../common/ddd/model";
import {DomainEventBase, AggregateEvent} from "../../common/ddd/event";
import {Destination, Message} from "./Message";

export var MessageContextName: string = "message";

/**
 * Fired WHEN message was sent but not delivered
 *
 */
export class MessageCreatedEvent extends DomainEventBase {
  public get msg():Message {
    return this._msg;
  }
  private _msg:Message;

  /**
   * Constructor
   * @param msg
   */
  constructor(msg: Message) {
      super(MessageContextName, "created");
    this._msg = msg;
  }
}

/**
 * Fired after event entity was updated
 */
export class MessageUpdatedEvent extends AggregateEvent {
  public get notifyingUsers():Id[] {
    return this._notifyingUsers;
  }
  private _notifyingUsers:Id[];

  constructor(msgId: Id, notifyingUsers: Id[]) {
    super(MessageContextName, "updated", msgId, "");
    this._notifyingUsers = notifyingUsers;
  }
}

/**
 * Fired after message sent to a specific user/context os users and should be delivered.
 */
export class MessageReceivedEvent extends AggregateEvent {

  /**
   * Message name
   * @type {string}
   */
  public static Name: string = "received";

  public get message() {
    return this._message;
  }

  private _message: Message;

  /**
   * Constructor
   * @param msg
   * @param toUserId
   */
  constructor(msg: Message) {
    super(MessageContextName, MessageReceivedEvent.Name, msg.id, "");
    this._message = msg;
  }
}

/**
 * Fired WHEN message was delivered to a client
 */
 export class MessageReceiveAcknowledgedEvent extends AggregateEvent {

  public static Name: string = "receive-acknowledged";

  public get deliveredOn() {
      return this._deliveredOn;
  }

  private _deliveredOn:Date;

  constructor(id:Id, deliveredOn:Date) {
      super(MessageContextName, MessageReceiveAcknowledgedEvent.Name, id, "");
      this._deliveredOn = deliveredOn;
  }
}
