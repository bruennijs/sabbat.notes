/**
 * Created by bruenni on 18.08.15.
 */

var dal = require('./Dal');
var console = require('console');

console.log('server running');

var repo = new dal.Repository.FsObjectRepository();
repo.Insert(new dal.Models.IdObject("789"));
