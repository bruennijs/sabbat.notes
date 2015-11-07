/**
 * Repository interfaces
 */

/// <reference path="./../../typings/tsd.d.ts" />

import util = require('util');
import fs = require('fs');
import path = require('path');
import _ = require('underscore');
import rx = require('rx');
import {Id} from "../../common/ddd/model";
import {IdObject} from "../../common/ddd/model";
import {IRepository} from "../../common/ddd/persistence";
import {Func2} from "../../common/ddd/persistence";


    /**
     * File based db
     */
    export class FsObjectRepository implements IRepository<IdObject> {
        GetById(id:Id):Rx.Observable<IdObject> {
            return undefined;
        }
        nextId():Id {
            return undefined;
        }
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
        Find(cb?: Func2<Error, IdObject[], void>): void {
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

                    var mappedModels = contentBuffers.map<IdObject>((content) => {
                        return IdObject.Parse(content.toString());
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
        GetRx(): rx.Observable<IdObject> {
            return rx.Observable.from([new IdObject(new Id("4711"))]);
        }

        /**
         * Inserts new objects
         * @param object
         * @constructor
         */
        Insert(object:IdObject): rx.Observable<IdObject> {
            console.log(util.format('Insert object[id=%s]', object.id));

            fs.writeFileSync(path.join(this.dbDir, util.format('%s.js', object.id)), JSON.stringify(object), 'utf8');

            return undefined;
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