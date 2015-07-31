/**
 * Created by bruenni on 29.07.15.
 */

var NodeModelCreator;

var console = require('console');

function NodeModel(options) {
    this.Title = options.Title;
    this.Content = options.Content;
}

NodeModel.prototype.Title = "Default text";

NodeModel.prototype.Content = "";


NodeModelCreator = function (options) {
    return new NoteModel(options);
}

module.exports = NodeModelCreator;
