/**
 * Created by bruenni on 26.11.15.
 */

var path = require("path");

export var addSelfUrl = function(baseUrl: string, resourceId: string): void {
  this.link = path.join(baseUrl, resourceId);
  console.log(this.link);
};
