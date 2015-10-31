/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
import rx = require('rx');

import model = require('./../../common/ddd/model');
import event = require('./../../common/ddd/event');

import user = require('./../Model');
import puser = require('./../../infrastructure/persistence/UserRepository');

import pmsg = require('./../../infrastructure/persistence/MessageRepository');
import msg = require('./Message');
import factory = require('./MessageFactory');
import msgEvents = require('./MessageEvents');

export class MessageService implements event.IEventHandler<event.IDomainEvent> {
  private _msgRepo;
  private _factory;
  private _userRepo;
  private _bus;

  constructor(msgRepo: pmsg.MessageRepository, userRepo: puser.UserRepository, noteFactory: factory.MessageFactory, bus: event.IDomainEventBus) {
    this._msgRepo = msgRepo;
    this._userRepo = userRepo;
    this._factory = noteFactory;
    this._bus = bus;
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

    var nextId = this._msgRepo.nextId();

    var subject = new rx.ReplaySubject<msg.Message>();

/*    var fromUser = this._userRepo.GetById(from);
    var toUser = this._userRepo.GetById(to);*/

/*    var message = new msg.Message(nextId, from);

    //// contains business logic
    var events = message.create(fromUser.id, toUser.id, content);


    // insert to repo.
    this._msgRepo.Insert(message, function(err, createdMsg) {
      if (err === null)
      {
        subject.onNext(createdMsg);
        subject.onCompleted();
      }
      else
      {
        subject.onError(err);
      }
    });

    // fire MessageSentEvent
    events.forforEeach((item, n, arr) => void {
      that._bus.Publish(item);
    });*/

    return subject;
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
      var message = this._msgRepo.GetById(event.id);

       //// transition to delivered state and store to repo
      //message.Delivered();

      //this._msgRepo.Update(message);
    }
  }
}
