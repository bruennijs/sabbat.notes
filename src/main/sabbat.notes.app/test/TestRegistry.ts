import {IApplicationRegistry} from "../RegistryComposite";
import {RegistryComposite} from "../RegistryComposite";
import {ApplicationRegistry} from "../ApplicationRegistry";
/**
 * Created by bruenni on 02.11.15.
 */

var appConfig = require('./test.config.json');

/**
 * Register all test specific dependencies
 */
class TestRegistry implements IApplicationRegistry
{
  Register(context: any):void {
    console.log("Register Test");
    //context.register("appConfig", ).strategy(di.strategy.singleton);
    context.register("appConfig", function () {
      return appConfig;
    }).factory(di.factory.func).strategy(di.strategy.singleton);
  }
}

export var Registry: RegistryComposite = new RegistryComposite([new TestRegistry(), new ApplicationRegistry()]);


