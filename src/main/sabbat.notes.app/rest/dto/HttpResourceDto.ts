/**
 * Created by bruenni on 26.11.15.
 */

import url = require("url");
import {IdObject} from "../../common/ddd/model";

export var addSelfUrl = function(baseUrl: string, resourceId: string): void {
  this.link = url.resolve(baseUrl, resourceId);
  console.log(this.link);
};
