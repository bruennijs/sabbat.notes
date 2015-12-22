/**
 * Created by bruenni on 26.11.15.
 */

import {User} from "../../domain/Model";
import {addSelfUrl} from "../dto/HttpResourceDto";

var userDto = function(user: User): any {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email.toString()
  };
};

export var toDto = function(baseUrl: string, user: User): any {
  var dtoObject = userDto(user);
  addSelfUrl.call(dtoObject, "users", user.id.value);
  return dtoObject;
};


