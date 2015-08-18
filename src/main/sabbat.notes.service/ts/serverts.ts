/**
 * Created by bruenni on 18.08.15.
 */

import Dal = require('./Dal');

var repo = new Dal.Repository.FsObjectRepository();
repo.Insert(new Dal.Models.IdObject("555"));

