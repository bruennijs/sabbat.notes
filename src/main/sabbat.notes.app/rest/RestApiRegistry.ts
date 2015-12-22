/**
 * Created by bruenni on 01.11.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

require('./../node_modules/di-lite/di-lite');    // no commonjs module exported file

import {MessageWsIoAdapter} from "./message/MessageWsIoAdapter";

export class RestApiRegistry
{
    /**
     *
     * @param context
     * @constructor
     */
    Register(context: any):void {
        console.log("Register REST API");
        context.register("messageWsIoAdapter", MessageWsIoAdapter).strategy(di.strategy.singleton);
    }
}
//var Context: DiLite.CreateContext = new ApplicationRegistry().Context;