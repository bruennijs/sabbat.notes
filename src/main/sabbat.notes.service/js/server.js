/**
 * Created by bruenni on 18.08.15.
 */

var dal = require('dal');
var console = require('console');

console.log('server running');

var repo = new dal.FsObjectRepository();
repo.Insert(new Service.Models.IdObject("123"));
