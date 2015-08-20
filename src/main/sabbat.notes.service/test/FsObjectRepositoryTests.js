/**
 * Created by bruenni on 18.08.15.
 */

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var teardown = require('mocha').teardown;
var test = require('mocha').test;
var assert = require('assert');

var Dal = require('../Dal.js');
var fs = require('fs');

suite('Array', function() {
    setup(function() {
    });

    suite('#indexOf()', function() {
        test('should return -1 when not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));

        });
    });
});

suite('FsObjectRepositoryTests', function () {

    setup(function() {
        this.path = 'dist/js/db/test';
        this.sut = new Dal.Repository.FsObjectRepository(this.path);
    });

    teardown(function() {
    });

    suite('#Crud', function() {
        test('should create dir', function() {
            var repo = new Dal.Repository.FsObjectRepository(this.path);
            repo.Init();
            assert.equal(true, fs.existsSync(this.path), "path does not exist Init()");
        });

        test('should insert file', function (done) {
            var obj = new Dal.Models.IdObject("3754");
            this.sut.Insert(obj);

            this.sut.Get(function(err, models) {
                assert.equal(1, models.length);
                assert.equal(obj.id, models[0].id);
                done();
            });
        });
    })
})
