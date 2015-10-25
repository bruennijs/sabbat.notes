/**
 * Created by bruenni on 25.10.15.
 */

import event = require('./../../common/ddd/event');
import model = require('./../../common/ddd/model');

/**
 * Fired WHEN message was sent but not delivered
 */
export class MessageSentEvent implements event.IDomainEvent {
    public get id() {
        return this._id;
    }
    private _id;

    public get group():string {
        return this._group;
    }

    private _group:string = 'message';

    constructor(id: model.Id) {
        this._id = id;
    }
}

/**
 * Fired WHEN message was delivered to a client
 */
export class MessageDeliveredEvent implements event.IDomainEvent {
    public get deliveredOn() {
        return this._deliveredOn;
    }

    private _deliveredOn;
    public get id() {
        return this._id;
    }
    private _id;

    public get group():string {
        return this._group;
    }

    private _group:string = 'message';

    constructor(id: model.Id, deliveredOn: Date) {
        this._id = id;
        this._deliveredOn = deliveredOn;
    }
}
