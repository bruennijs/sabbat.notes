/**
 * Created by bruenni on 18.08.15.
 */

var dal = require('./Dal');
var console = require('console');
var argv = require('optimist').argv;
var appconfig = require(argv.c);

console.log('Server running[appconfig=' + JSON.stringify(appconfig) + ']');

var repo = new dal.Repository.FsObjectRepository(appconfig.db_path);
repo.Init();

repo.Insert(new dal.Models.IdObject("789"));

repo.Get();
