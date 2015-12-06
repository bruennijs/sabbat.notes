/**
 * Created by bruenni on 07.11.15.
 */

import {RegistryComposite} from "./RegistryComposite";
import {ApplicationRegistry} from "./ApplicationRegistry";
import {IApplicationRegistry} from "./RegistryComposite";
import {RestApiRegistry} from "./rest/RestApiRegistry";

var appConfig = require('./appconfig');

class ProductionRegistry implements IApplicationRegistry
{
  Register(context: any):void {
    context.register("appConfig").object(appConfig);
  }
}

export var Registry: RegistryComposite = new RegistryComposite([new ProductionRegistry(), new ApplicationRegistry(), new RestApiRegistry()]);