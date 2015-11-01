/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
require('di-lite');

export class ApplicationRegistry {
    public get ctx() {
        return this._ctx;
    }
    private _ctx;

    /**
     * Constructor
     */
    constructor() {
        this._ctx = di.createContext();

        this._ctx.register("MembershipService")
    }
}

var Context: DiLite.CreateContext = new ApplicationRegistry().ctx;