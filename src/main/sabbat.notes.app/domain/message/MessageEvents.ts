/**
 * Created by bruenni on 25.10.15.
 */

import event = require('./../../common/ddd/event');
import model = require('./../../common/ddd/model');

/**
 * Fired WHEN message was sent but not delivered
 */
export class MessageCreatedEvent implements event.IDomainEvent {
    public get to():model.Id {
        return this._to;
    }
    public get from():model.Id {
        return this._from;
    }
    public get id() {
        return this._id;
    }
    private _id;

    public get group():string {
        return this._group;
    }

    private _group:string = 'message';

    private _from:model.Id;

    private _to:model.Id;

    constructor(id:model.Id, from:model.Id, to:model.Id, content:string) {
        this._id = id;
        this._from = from;
        this._to = to;
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
