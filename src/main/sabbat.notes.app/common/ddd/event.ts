/**
 * Created by bruenni on 25.10.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import rx = require('rx');

/**
 * All domain events inherits IDomainEvent
 */
export interface IDomainEvent {
    /**
     * Name of group a event contains to, can be an aggregate root name (e.g. can be mapped to specific channels in rabbitmq)
     * Contains values like "message", "user"
     */
    group: string;
}

/**
 * Event bus can be implemented by RabbitMQ e.g. to get distributed events.
 */
export interface IDomainEventBus {
    /**
     * Publishes event to the bus.
     * @param event to publish.
     * @constructor
     */
    Publish(event: IDomainEvent): void;

    /**
     * Subcribes for asynchronous event
     * @group: name of the group to listen for events. See IDomainEvent for property 'group'
     * @constructor
     */
    Subscribe(group: string): rx.IObservable<IDomainEvent>;
}

/**
 * Handler for handling events
 */
export interface IEventHandler<TEvent extends IDomainEvent> {
    /**
     * Domain handler processing events.
     * @param event
     * @constructor
     */
    Handle(event: TEvent): void;
}