/**
 * Created by bruenni on 18.08.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var test = require('mocha').test;
var assert = require('assert');

var Dal = require('../Dal.js');
var fs = require('fs');

suite('Array', function() {
    setup(function() {
        // ...
    });

    suite('#indexOf()', function() {
        test('should return -1 when not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

suite('FsObjectRepositoryTests', function () {
    suite('#Crud', function() {
        test('should create dir', function() {
            var expPath = 'dist/js/db/somedir';
            var repo = new Dal.Repository.FsObjectRepository(expPath);
            repo.Init();
            assert.equal(true, fs.existsSync(expPath), "path does not exist Init()");
        });

        test('should insert file', function () {

        })
    })
})
