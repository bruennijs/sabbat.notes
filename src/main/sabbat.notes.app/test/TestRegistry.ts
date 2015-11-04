/**
 * Created by bruenni on 02.11.15.
 */

import regComp = require('./../RegistryComposite');
import regApp  = require('./../ApplicationRegistry');
var appConfig = require('./test.config.json');

/**
 * Register all test specific dependencies
 */
export class TestRegistry implements regComp.IApplicationRegistry
{
  Register(context: any):void {
    console.log("Register Test");
    //context.register("appConfig", ).strategy(di.strategy.singleton);
    context.register("appConfig", function () {
      console.log("appConfig creator");
      return appConfig;
    }).factory(di.factory.func).strategy(di.strategy.singleton);
  }
}

export var Registry: regComp.RegistryComposite = new regComp.RegistryComposite([new TestRegistry(), new regApp.ApplicationRegistry()]);


