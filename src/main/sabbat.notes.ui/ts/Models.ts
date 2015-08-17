module Sabbat.Notes.Models {
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

    /**
     * Person model.
     */
    export class Person extends IdObject {
        public get name() {
            return this._name;
        }

        private _name: string;

        constructor(id:string, name:string) {
            super(id);
            this._name = name;
        }
    }

    /**
     * User model
     */
    export class User extends Person {
        public get password() {
            return this._password;
        }
        private _password;

        public get userName() {
            return this._userName;
        }

        private _userName;

        constructor(id: string, name: string, userName: string, password: string)
        {
            super(id,  name);
            this._userName = userName;
            this._password = password;
        }
    }
}
