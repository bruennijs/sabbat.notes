/**
 * Created by bruenni on 26.11.15.
 */

import {addSelfUrl} from "../dto/HttpResourceDto";
import {User} from "../../domain/user/User";

var userDto = function(user: User): any {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email
  };
};

export var serialize = function(user: User): any {
  var dtoObject = userDto(user);
  addSelfUrl.call(dtoObject, "users", user.id.value);
  return dtoObject;
};


