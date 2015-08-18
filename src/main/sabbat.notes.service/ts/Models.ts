export module Models {
    /**
     * Created by bruenni on 16.08.15.
     */
    export class IdObject {
        public get id() {
            return this._id;
        }

        private _id: string;

        constructor(id:string) {
            this._id = id;
        }
    }
}
