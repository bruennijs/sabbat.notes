import CreateContext = DiLite.CreateContext;
/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="typings/tsd.d.ts" />

require('./node_modules/di-lite/di-lite');    // no commonjs module exported file


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
    private _ctx: CreateContext;
    private _registries: IApplicationRegistry[];

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
    Register(context: any): void {
        this._registries.forEach(function (registry) {
            registry.Register(context);
        });
    }
}

//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;