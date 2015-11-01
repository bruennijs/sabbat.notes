/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
require('di-lite');

var appConfig = require('./appconfig');

var membership = require('./application/MembershipService.ts');
var userFactory = require('./domain/user/UserFactory.ts');
var userRepo = require('./infrastructure/persistence/UserRepository.ts');
var userModel = require('./domain/Model.ts');

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

        this._ctx.register("appFactory").object(appConfig);
        this._ctx.register("userFactory", userFactory.UserFactory).strategy(di.strategy.singleton);
        this._ctx.register("userRepository", userRepo.UserRepository, appConfig).strategy(di.strategy.singleton);
        this._ctx.register("MembershipService", membership.MembershipService).strategy(di.strategy.singleton);
    }
}

var Context: DiLite.CreateContext = new ApplicationRegistry().ctx;