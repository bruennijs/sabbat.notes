/**
 * Created by bruenni on 29.07.15.
 */

function NoteModel(options) {
    this.id = options.id;
    this.title = options.title;
    this.content = options.content;
}

NoteModel.prototype.getTitle = function() {
    return this.title;
}

NoteModel.prototype.getContent = function() {
    return this.content;
}

