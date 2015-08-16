/**
 * Created by bruenni on 17.08.15.
 */
class Note {
    public get title() {
        return this._title;
    }
    private _title;

    /**
     * Constructor
     * @param title title text
     */
    constructor(title: string) {
        this._title = title;
    }
}
