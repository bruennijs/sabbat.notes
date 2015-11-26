/**
 * Created by bruenni on 26.11.15.
 */

import {User} from "../../domain/Model";
import {httpDto} from "./HttpResourceDto";

var userDto = function(user: User): any {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email.host
  };
};

export var toDto = function(baseUrl: string, user: User): any {
  return httpDto(baseUrl, userDto(user), user);
};


