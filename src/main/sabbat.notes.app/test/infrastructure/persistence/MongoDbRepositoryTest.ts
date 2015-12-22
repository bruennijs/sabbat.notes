/**
 * Created by bruenni on 10.11.15.
 */

/*
 * Created by bruenni on 16.10.15.
 */

import {IdObject} from "../../../common/ddd/model";
import {Id} from "../../../common/ddd/model";
import {MongoDbRepository} from "./../../../common/infrastructure/persistence/MongoDbRepository"
import {GenericIdModelFactoryBuilder} from "./../../builder/GenericIdModelFactoryBuilder"
import {} from "rx.all";

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var testConfig = require('./../../test.config');

suite("MongoDbRepositoryTest", function() {

  test("#when update document expect version increased by one afterwards", function () {
    var id = new Id("4711");

    //var sut = new MongoDbRepository(testConfig, new GenericIdModelFactoryBuilder(), "MongoDbRepositoryTest");
/*    sut.Init(true).subscribe()
    sut.Insert(id);
    assert.equal(0, sut.id);
    sut.Update()

    assert.equal(id + 1, sut.id);*/
  });
});
