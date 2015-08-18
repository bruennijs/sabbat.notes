/**
 * Repository interfaces
 */

/// <reference path="../node_modules/DefinitelyTyped/node/node-0.10.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');

export module Models {

        /**
         * Created by bruenni on 16.08.15.
         */
        export class IdObject {
            public get id() {
                return this._id;
            }

            private _id:string;

            constructor(id:string) {
                this._id = id;
            }
        }
}

export module Repository {
    export interface IRepository {
        /**
         * Gets all users.
         * @constructor
         */
        Get(): Models.IdObject[];

        /**
         * Inserts row in database
         * @param object
         * @constructor
         */
        Insert(object:Models.IdObject);
    }

    /**
     * File based db
     */
    export class FsObjectRepository implements IRepository {
        private dbDir;

        constructor(dbDir: string) {
            this.dbDir = dbDir;
        }

        Init(): void {
            fs.mkdirSync(this.dbDir);
        }

        Get():Models.IdObject[] {
            fs.readdir(this.dbDir, (err, files) =>
            {
                files.forEach((file) => console.log(file));
            });

            return [];
        }

        Insert(object:Models.IdObject) {
            console.log(util.format('Insert object[id=%s]', object.id));

            fs.writeFileSync(path.join(this.dbDir, util.format('%s.js', object.id)), JSON.stringify(object), 'utf8');

            return;
        }
    }
}