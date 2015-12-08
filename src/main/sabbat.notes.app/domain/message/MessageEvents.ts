///<reference path="../../common/ddd/event.ts"/>
/**
 * Created by bruenni on 25.10.15.
 */

import {Id} from "../../common/ddd/model";
import {DomainEventBase} from "../../common/ddd/event";
import {Destination} from "./Message";

export class MessageEventBase extends DomainEventBase {
    get id() {
        return this._id;
    }

    private _id;

  /**
   * Constructor.
   * @param id
   * @param group
   */
  constructor(id: Id, group: string) {
        super(group);
        this._id = id;
    }
}

/**
 * Fired WHEN message was sent but not delivered
 *
 */
export class MessageCreatedEvent extends MessageEventBase {
    get content() {
        return this._content;
    }

    private _content;

    public get to(): Destination {
        return this._to;
    }

    public get from():Id {
        return this._from;
    }

    private _from:Id;

    private _to: Destination;

    constructor(id: Id, from: Id, to: Destination) {
        super(id, "message");
        this._from = from;
        this._to = to;
    }
}

/**
 * Fired WHEN message was delivered to a client
 */
export class MessageDeliveryRequestedEvent extends MessageEventBase {
    get content():string{
            return this._content;
      }

    get to():Id{
            return this._to;
      }

    get from():Id{
            return this._from;
      }

    private _from:Id;
    private _to:Id;
    private _content:string;

    /**
     *
     * @param id
     * @param deliveredOn
     */
    constructor(id:Id, from: Id, to: Id, content: string) {
        super(id, "message");
        this._from = from;
        this._to = to;
        this._content = content;
    }
}

/**
 * Fired WHEN message was delivered to a client
 */
 export class MessageDeliveredEvent extends MessageEventBase {
    public get deliveredOn() {
        return this._deliveredOn;
    }

    get to():Id {
      return this._to;
    }

    get from():Id{
      return this._from;
    }

    private _from:Id;
    private _to:Id;

    private _deliveredOn:Date;

    constructor(id:Id, from:Id, to:Id, deliveredOn:Date) {
        super(id, "message");
        this._deliveredOn = deliveredOn;
      this._from = from;
      this._to = to;
    }
}
