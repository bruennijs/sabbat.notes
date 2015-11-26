import {DomainEventBusImpl} from "./common/ddd/impl/DomainEventBusImpl";
import {IApplicationRegistry} from "./RegistryComposite";
import {UserFactory} from "./domain/user/UserFactory";
import {UserRepository} from "./infrastructure/persistence/UserRepository";
import {MembershipService} from "./application/MembershipService";
import {MessageRepository} from "./infrastructure/persistence/MessageRepository";
import {MessageFactory} from "./domain/message/MessageFactory";
import {MessageService} from "./application/MessageService";
/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="./typings/tsd.d.ts" />

require('./node_modules/di-lite/di-lite');    // no commonjs module exported file

export class ApplicationRegistry implements IApplicationRegistry
{
    /**
     *
     * @param context
     * @constructor
     */
    Register(context: any):void {
        console.log("Register Application");
        context.register("userFactory", UserFactory).strategy(di.strategy.singleton);
        context.register("userRepository", UserRepository).strategy(di.strategy.singleton);
        context.register("membershipService", MembershipService).strategy(di.strategy.proto);

        context.register("eventBus", DomainEventBusImpl).strategy(di.strategy.singleton);
        context.register("messageRepository", MessageRepository).strategy(di.strategy.singleton);
        context.register("messageService", MessageService).strategy(di.strategy.proto);
        context.register("messageFactory", MessageFactory).strategy(di.strategy.singleton);

    }
}
//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;