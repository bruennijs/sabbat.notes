/**
 * Created by bruenni on 26.11.15.
 */

import url = require("url");
import {Message} from "../../domain/message/Message";
import {httpDto} from "./HttpResourceDto";

var messageDto = function (msg:Message): any {
  return {
    id: msg.id.toString(),
    state: msg.currentState,
    from: msg.from.toString(),
    to: msg.destination.To.toString(),
    content: msg.content,
    date: msg.deliveryDate
  };
};

export var toDto = function(baseUrl: string, msg: Message): any {
  return httpDto(baseUrl, messageDto(msg), msg);
};



