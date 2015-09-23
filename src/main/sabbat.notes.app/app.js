/**
 * Created by bruenni on 23.09.15.
 */

import Dal = require('./Dal');

var repo = new Dal.Repository.FsObjectRepository('.');
repo.Insert(new Dal.Models.IdObject("555"));