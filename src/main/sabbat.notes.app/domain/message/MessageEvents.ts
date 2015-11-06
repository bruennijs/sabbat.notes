///<reference path="../../common/ddd/event.ts"/>
/**
 * Created by bruenni on 25.10.15.
 */

import {Id} from "../../common/ddd/model";
import {IDomainEvent} from "../../common/ddd/event";

/**
 * Fired WHEN message was sent but not delivered
 *
 */
    export class MessageCreatedEvent implements IDomainEvent {
        public get to(): Id {
            return this._to;
        }

        public get from(): Id {
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

        private _from:Id;

        private _to:Id;

        constructor(id:Id, from:Id, to:Id, content:string) {
            this._id = id;
            this._from = from;
            this._to = to;
        }
    }

    /**
     * Fired WHEN message was delivered to a client
     */
    export class MessageDeliveredEvent implements IDomainEvent {
        public get toUserId():Id {
            return this._toUserId;
        }

        public set toUserId(value:Id) {
            this._toUserId = value;
        }

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
        private _toUserId:Id;

        constructor(id:Id, deliveredOn:Date, toUserId:Id) {
            this._id = id;
            this._deliveredOn = deliveredOn;
            this._toUserId = toUserId;
        }
    }
