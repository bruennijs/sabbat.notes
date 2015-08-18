/**
 * Created by bruenni on 17.08.15.
 */

module Sabbat.Notes.Repository {

    //import Repo = require('./Repository');
    //import Models = require('./inheritance');
    //import RepoNs = Repo.Sabbat.Notes.Repository;
    //import ModelsNs = Models.Sabbat.Notes.Models;

    export class UserRepository implements Sabbat.Notes.Repository.IUserRepository
    {
        GetUsers(): Sabbat.Notes.Models.User[] {
            return [new Sabbat.Notes.Models.User('1', "Olli", "bruenni", "")]
        }
    }
}