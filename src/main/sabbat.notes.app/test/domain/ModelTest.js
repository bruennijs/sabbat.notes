/*
 * Created by bruenni on 16.10.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var model = require('./../../domain/Model');
var noteDocument = require('./note_doc.json');

suite("NoteModelTest", function() {


  test("#when load note json document expect loadFrom loads into properties", function () {
    var sut = new model.Note();
    sut.load(noteDocument);

    console.info('load[' + sut + ']') ;

    assert.equal("4711", sut.id);
    assert.equal("title text", sut.title);
    assert.equal("note document content", sut.content);
  });

  test("#when load note json document expect loadFrom loads into properties", function () {
    var sut = new model.Note();
    sut.loadFrom('{"_id":"12", "title":"parsed title"}');

    console.info('loadFrom[' + sut + ']') ;

    assert.equal("12", sut.id);
    assert.equal("parsed title", sut.title);
  });
});
