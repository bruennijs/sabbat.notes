/*
 * Created by bruenni on 16.10.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var model = require('./../../domain/Model');
var noteDocument = require('./note_doc.json');

suite("Note model test", function() {


  test("#when load note json document expect loadFrom loads into properties", function () {
    var sut = new model.Note();
    sut.loadFrom(noteDocument);

    console.info(noteDocument);

    assert.equal("4711", sut.id);
    assert.equal("title text", sut.title);
    assert.equal("note document content", sut.content);
  });

  test("#when load note json document expect loadFrom loads into properties", function () {
    var sut = new model.Note();
    sut.loadFrom(noteDocument);

    console.info(noteDocument);

    assert.equal("4711", sut.id);
    assert.equal("title text", sut.title);
    assert.equal("note document content", sut.content);
  });
});
