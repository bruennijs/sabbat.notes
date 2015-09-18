/**
 * Created by bruenni on 17.09.15.
 */

(function() {
  var app = angular.module("sabbatApp.note");

  var notes = [
    {id: "1", title: "angular", content: "angular has to be explored. what when the text is bigger than the line of the list item?"},
    {id: "2", title: "checkout html", content: "html is trickky. I need much more time"}
  ];

  app.factory("noteService", ["uuid", function(uuid) {
    return new NoteService(uuid, []);
  }]);

  /**
   * Note model constructor
   * @param options
   * @constructor
   */
  function NoteModel(options) {
    this.id = options.id;
    this.title = options.title;
    this.content = options.content;
    this.checked = options.checked;
  };

  NoteModel.prototype.getTitle = function() {
    return this.title;
  };

  NoteModel.prototype.getContent = function() {
    return this.content;
  };

  /**
   * NoteService constructor
   * @param uuid
   * @constructor
   */
  function NoteService(uuid, notes) {
    this.uuidService = uuid;
    this.notes = notes;
  };

  NoteService.prototype.getNotes = function() {
    return this.notes;
  };

  NoteService.prototype.getById = function(id) {
    return this.notes.find(function(e, idx, array) {
      return e.id === id;
    });
  };

  NoteService.prototype.delete = function(id) {
    var checkCount = 0;
    this.notes.forEach(function(e, idx, array) {
      if (e.checked)
        checkCount++;
    });

    console.log(checkCount);
  };

  NoteService.prototype.create = function() {
    this.notes.push(new NoteModel({id: this.uuidService.v4(), title: "Title text", content: "Content here", checked: false}));
  };

})();