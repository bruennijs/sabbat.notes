/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
require('./node_modules/di-lite/di-lite');    // no commonjs module exported file

var membership = require('./application/MembershipService');
var userFactory = require('./domain/user/UserFactory');
var userRepo = require('./infrastructure/persistence/UserRepository');
var userModel = require('./domain/Model');

/**
 * All registries must implement this.
 */
export interface IApplicationRegistry {
    /**
     * Registers dependencies to context parameter.
     * @param context
     * @constructor
     */
    Register(context: any): void;
}

export class RegistryComposite implements IApplicationRegistry
{
    public get Context() {
        return this._ctx;
    }
    private _ctx;
    private _registries:IApplicationRegistry[];

    /**
     * Constructor
     */
    constructor(registries: IApplicationRegistry[]) {
        this._registries = registries;
        this._ctx = di.createContext();
        this.Register(this._ctx);
        this._ctx.initialize();
    }

    /**
     *
     * @param context
     * @constructor
     */
    Register(context:any):void {
        this._registries.forEach(function (registry) {
            registry.Register(context);
        })
    }
}



//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;