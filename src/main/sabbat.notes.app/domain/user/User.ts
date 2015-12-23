/**
 * Created by root on 23.12.15.
 */

import {Id} from "../../common/ddd/model";
import {IdObject} from "../../common/ddd/model";
/**
 * User entity
 */
export class User extends IdObject {
  public get email() {
    return this._email;
  }

  private _email: string;

  public get name() {
    return this._name;
  }

  private _name;

  /**
   * Constructor
   * @param id
   * @param name
   * @param email
   */
  constructor(id: Id, name: string, email: string) {
    super(id)
    this._name = name;
    this._email = email;
  }

  /**
   * Checks password.
   * @param plainPassword plain password
   */
  public checkPassword(plainPassword: string): boolean {
    return true;
  }
}
