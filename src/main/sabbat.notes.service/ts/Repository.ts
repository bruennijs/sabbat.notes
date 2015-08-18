/**
 * Repository interfaces
 */

/// <reference path="../node_modules/DefinitelyTyped/node/node-0.10.d.ts" />

import util = require('util');

export module Dal {

    /**
     * Created by bruenni on 16.08.15.
     */
    export class IdObject {
        public get id() {
            return this._id;
        }

        private _id: string;

        constructor(id:string) {
            this._id = id;
        }
    }

    export interface IRepository {
        /**
         * Gets all users.
         * @constructor
         */
        Get(): IdObject[];

        /**
         * Inserts row in database
         * @param object
         * @constructor
         */
        Insert(object: IdObject);
    }

    /**
     * File based db
     */
    export class FsObjectRepository implements IRepository
    {
        Get():IdObject[] {
            return undefined;
        }

        Insert(object: IdObject) {
            console.log(util.format('Insert object[id=%s]', object.id));
            return;
        }
    }
}