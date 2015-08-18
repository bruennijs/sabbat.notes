/**
 * Created by bruenni on 18.08.15.
 */

/// <reference path="Repository.ts"/>

import Dal = require('./Repository');

var repo = new Dal.Dal.FsObjectRepository();
repo.Insert(new Dal.Dal.IdObject("555"));

