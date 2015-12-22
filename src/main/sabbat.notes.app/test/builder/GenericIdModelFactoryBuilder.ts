/**
 * Created by bruenni on 13.12.15.
 */

import {IFactory} from "../../common/ddd/factory";
import {IdObject,Id} from "../../common/ddd/model";

export class GenericIdModelFactoryBuilder implements IFactory<IdObject> {
  CreateFromMongoDocument(document:any): IdObject {
    return new IdObject(Id.parse(document._id.toHexString()), document.version);
  }

  ToMongoDocument(obj: IdObject):any {
    return {
      _id: obj.id.toString(),
      version: obj.version
    };
  }

}
