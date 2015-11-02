/**
 * Created by bruenni on 02.11.15.
 */

import regComp = require('./../RegistryComposite');
import regApp  = require('./../ApplicationRegistry');
var appConfig = require('./test.config.json');

/**
 * Register all test specific dependencies
 */
class TestRegistry implements regComp.IApplicationRegistry
{
  Register(context: any):void {
    console.log("Register Test");
    context.register("appConfig", function () {
      console.log("appConfig creator");
      return appConfig;
    }).factory(di.factory.func).strategy(di.strategy.singleton);
  }
}

export var Registry: regComp.RegistryComposite = new regComp.RegistryComposite([new regApp.ApplicationRegistry(), new TestRegistry()]);


