/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
require('./node_modules/di-lite/di-lite');    // no commonjs module exported file

import regComp = require('./RegistryComposite');

import membership = require('./application/MembershipService');
import userFactory = require('./domain/user/UserFactory');
import userRepo = require('./infrastructure/persistence/UserRepository');
import userModel = require('./domain/Model');
var appConfig = require('./appconfig');

export class ApplicationRegistry implements regComp.IApplicationRegistry
{
    /**
     *
     * @param context
     * @constructor
     */
    Register(context: any):void {
        console.log("Register Application");
        context.register("userFactory", userFactory.UserFactory).strategy(di.strategy.singleton);
        context.register("userRepository", userRepo.UserRepository).strategy(di.strategy.singleton);
        context.register("membershipService", membership.MembershipService).strategy(di.strategy.proto);
    }
}

export class ProductionRegistry implements regComp.IApplicationRegistry
{
    Register(context: any):void {
        context.register("appConfig").object(appConfig);
    }
}



//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;