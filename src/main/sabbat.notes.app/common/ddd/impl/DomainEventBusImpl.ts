/**
 * Created by bruenni on 25.10.15.
 */

//import rx = require('rx');
import * as rx from "rx";

import {IDomainEventBus} from "../event";
import {IDomainEvent} from "../event";

export class DomainEventBusImpl implements IDomainEventBus {

    /**
     * js object where:
     * property: type
     * value: Observable<IDomainEvent>[]
     */
    private map: any = {}

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * fires subscribes obseravables.
     * @param event
     * @constructor
     */
    publish(event: IDomainEvent): void {
        var observables = this.map[event.context];
        if (observables !== undefined) {
            observables.forEach((observable, n, array) => {
                //// fire event for each observable subscribed.
                observable.onNext(event);
            });
        }
    }

    /**
     * registers observables.
     * @returns {null}
     * @constructor
     */
    subscribe(contextName: string): rx.Observable<IDomainEvent> {
        if (contextName === undefined)
        {
            throw new Error("groupName undefined");
        }

        var subject = new rx.ReplaySubject<IDomainEvent>();

        //// add when not already existing
        var observableList = this.map[contextName];
        if (observableList !== undefined)
        {
            observableList.push(subject);
        }
        else
        {
            this.map[contextName] = [subject];
        }

        return subject;
    }

}