/**
 * Repository interfaces
 */

/// <reference path="../node_modules/DefinitelyTyped/node/node-0.10.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');
import _ = require('underscore');
import rx = require('rx');

    /**
     * File based db
     */
    export class FsObjectRepository implements IRepository {
        private dbDir;

        constructor(dbDir: string) {
            this.dbDir = dbDir;
        }

        Init(): void {
            if (!fs.existsSync(this.dbDir)) {
                fs.mkdirSync(this.dbDir);
            }
        }

        /**
         * Gets all models in the collection
         * @returns {any}
         * @constructor
         */
        Get(cb?: Func2<Error, Models.IdObject[], void>): void {
            fs.readdir(this.dbDir, (err1, files) =>
            {
                if ((err1 === null)) {
                    var contentBuffers = files.map<Buffer>((fileName) => {
                        /// read file
                        try
                        {
                            return fs.readFileSync(path.join(this.dbDir, fileName));
                        }
                        catch (err)
                        {
                            cb(err, null);
                        }
                    });

                    var mappedModels = contentBuffers.map<Models.IdObject>((content) => {
                        return Models.IdObject.Parse(content.toString());
                    });

                    cb(null, mappedModels);
                }
                else {
                    cb(err1, null);
                }
            });
        }

        /**
         * Gets by async RX
         * @returns {any}
         * @constructor
         */
        GetRx(): rx.IObservable<Models.IdObject> {
            return rx.Observable.from([new Models.IdObject("4711")]);
        }

        /**
         * Inserts new objects
         * @param object
         * @constructor
         */
        Insert(object:Models.IdObject) {
            console.log(util.format('Insert object[id=%s]', object.id));

            fs.writeFileSync(path.join(this.dbDir, util.format('%s.js', object.id)), JSON.stringify(object), 'utf8');
        }

/*        Get():Rx.Observable<Models.IdObject[]> {
            fs.readdirSync(this.dbDir, (err, files) =>
            {
            });

            var s = new Rx.Subject.new<Models.IdObject[]>();

            /// var rObs = Rx.Observable.fromrange(0, 2);
            var readDirObs = rx.Observable.fromNodeCallback<string>(fs.readdir);
            return readDirObs(this.dbDir);
        }*/
    }
}