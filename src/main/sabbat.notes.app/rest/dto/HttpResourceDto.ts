/**
 * Created by bruenni on 26.11.15.
 */

import url = require("url");
import {IdObject} from "../../common/ddd/model";

export var httpDto = function(baseUrl: string, dto: any, entity: IdObject): any {
  dto.link = url.resolve(baseUrl, entity.id.toString());
  return dto;
};
