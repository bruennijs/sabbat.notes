/**
 * Repository interfaces
 */

module Sabbat.Notes.Repository {

    //import inheritance = require('./inheritance');
    //import Models = inheritance.Sabbat.Notes.Models;

    export interface IUserRepository {
        /**
         * Gets all users.
         * @constructor
         */
        GetUsers(): Sabbat.Notes.Models.User[];
    }
}