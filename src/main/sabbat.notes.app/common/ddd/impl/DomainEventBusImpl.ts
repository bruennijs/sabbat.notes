/**
 * Created by bruenni on 25.10.15.
 */

import bus = require('./../event');
import rx = require('rx');

export class DomainEventBusImpl implements bus.IDomainEventBus<bus.IDomainEvent> {

    /**
     * js object where:
     * property: type
     * value: IObservable<IDomainEvent>[]
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
    Publish(event: bus.IDomainEvent):void {
        console.log(event);
        var observables = this.map[event.group];
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
    Subscribe(groupName: string): rx.IObservable<bus.IDomainEvent> {
        if (groupName === undefined)
        {
            throw new Error("groupName undefined");
        }

        var subject = new rx.ReplaySubject<bus.IDomainEvent>();

        //// add when not already existing
        var observableList = this.map[groupName];
        if (observableList !== undefined)
        {
            observableList.push(subject);
        }
        else
        {
            this.map[groupName] = [subject];
        }

        return subject;
    }

}