import {Message} from "../../domain/message/Message";
import {Id} from "../../common/ddd/model";
import {MessageState} from "../../domain/message/Message";
import {Destination} from "../../domain/message/Message";
import {DestinationType} from "../../domain/message/Message";
/**
 * Created by root on 23.12.15.
 */

export class MessageBuilder {
  build(): Message {
    return new Message(Id.parse("1"), Id.parse("2"), new Destination(Id.parse("3"), DestinationType.User), "content text", MessageState.Created, new Date(Date.now()));
  }
}
