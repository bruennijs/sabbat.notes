/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../node_modules/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />
import rx = require('rx');
import _ = require('underscore');

import model = require('./../common/ddd/model');
import event = require('./../common/ddd/event');

import user = require('./../domain/Model');
import puser = require('./../infrastructure/persistence/UserRepository');

import pmsg = require('./../infrastructure/persistence/MessageRepository');
import msg = require('./../domain/message/Message');
import factory = require('./../domain/message/MessageFactory');
import msgEvents = require('./../domain/message/MessageEvents');

export class MessageService implements event.IEventHandler<event.IDomainEvent> {
  public messageRepository;
  public messageFactory;
  public userRepository;
  public eventBus;
  public dependencies;

  constructor() {
    this.dependencies = "eventBus, messageFactory, userRepository, messageRepository";
  }

  /***
   * sends a message to a user in the domain.
   * 1) gets from and to user from UserRepo
   * 2) sends message
   * @param from
   * @param to
   * @param content
   * @returns {Rx.ReplaySubject<T>}
   */
  public sendMessage(from: model.Id, to: model.Id, content: string): rx.IObservable<msg.Message> {
    var that = this;

    var fromUserObs = this.userRepository.GetById(from).map(function(user: user.User) { return { from: user } });
    var toUserObs = this.userRepository.GetById(to).map(function(user: user.User) { return { to: user } });

    // map id -> user instance
    var mapped = fromUserObs.merge(toUserObs);

    var reduced = mapped.reduce(function(acc: any, val: any) { return _.extend(acc, val) });
    // reduce to one object containing 'to' and 'from' property mapped to its user instance

    //var subject = new rx.ReplaySubject<msg.Message>();

    ////// contains business logic
    return reduced
        .select(function(usersMap, idx, obs)
          {
            var id = this.messageRepository.nextId();

            var createdMsg = new msg.Message(id);

            var createdEvents = createdMsg.create(usersMap.from, usersMap.to, content);

            return this.messageRepository
                      .Insert(createdMsg)
                      .Select(function(next)
                        {
                          return { instance: createdEvents, events: createdEvents };
                        });
          }, this)
        .do(function(msg)
          {
            // fire events
            msg.events.forEach(function(event, idx, arr) {
              that.eventBus.Publish(event);
            });

            return msg.instance;
          }, this);
  }

  /**
   * Handles:
   * 1) MessageDeliveredEvent
   * @param event
   * @constructor
   */
  Handle(event:event.IDomainEvent): void {
    if (event instanceof msgEvents.MessageDeliveredEvent)
    {
      var msgGet = this.messageRepository.GetById(event.id);

      msgGet.subscribe(function(msg) {
        //// transition to delivered state and store to repo
        msg.delivered(event as msgEvents.MessageDeliveredEvent);

        this.messageRepository.Update(msg).subscribe(function() {
          // log that msg was updated
          console.log("message updated[" + msg.id.toString() + "]");
        });
      });
    }
  }
}
