/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
require('./node_modules/di-lite/di-lite');    // no commonjs module exported file

var appConfig = require('./appconfig');

var membership = require('./application/MembershipService');
var userFactory = require('./domain/user/UserFactory');
var userRepo = require('./infrastructure/persistence/UserRepository');
var userModel = require('./domain/Model');

export class ApplicationRegistry {
    public get Context() {
        return this._ctx;
    }
    private _ctx;

    /**
     * Constructor
     */
    constructor() {
        this._ctx = di.createContext();

        this._ctx.register("appConfig").object(appConfig);
        this._ctx.register("userFactory", userFactory.UserFactory).strategy(di.strategy.singleton);
        this._ctx.register("userRepository", userRepo.UserRepository).strategy(di.strategy.singleton);
        this._ctx.register("membershipService", membership.MembershipService).strategy(di.strategy.singleton);
    }
}

//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;