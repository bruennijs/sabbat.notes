/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="typings/tsd.d.ts" />

require('./node_modules/di-lite/di-lite');    // no commonjs module exported file

import regComp = require('./RegistryComposite');

import membership = require('./application/MembershipService');
import userFactory = require('./domain/user/UserFactory');
import userRepo = require('./infrastructure/persistence/UserRepository');
import event = require('./common/ddd/impl/DomainEventBusImpl');
import userModel = require('./domain/Model');

import msgFac = require('./domain/message/MessageFactory');
import msgService = require('./application/MessageService');
import msgRepo = require('./infrastructure/persistence/MessageRepository');

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

        context.register("eventBus", event.DomainEventBusImpl).strategy(di.strategy.singleton);
        context.register("messageRepository", msgRepo.MessageRepository).strategy(di.strategy.singleton);
        context.register("messageService", msgService.MessageService).strategy(di.strategy.proto);
        context.register("messageFactory", msgFac.MessageFactory).strategy(di.strategy.singleton);
    }
}

export class ProductionRegistry implements regComp.IApplicationRegistry
{
    Register(context: any):void {
        context.register("appConfig").object(appConfig);
    }
}



//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;