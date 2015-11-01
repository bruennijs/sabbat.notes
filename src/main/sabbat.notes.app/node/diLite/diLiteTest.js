/**
 * Created by bruenni on 01.11.15.
 */

var _ = require('underscore');
require('./../../node_modules/di-lite/di-lite');    // no commonjs module exported file

var B = function() {
    this.value = 'B';
}

var A = function(arg1) {
    var that = this;
    this.dependencies = "funcObjProto, b";
    this.toString = function() {
        console.log(arg1 + "." + that.funcObjProto.value + "." + that.b.value);
    }
}

A.prototype.log = function() {
    this.funcObj
}

var FuncObject = function(spec) {
    var that = {
        value: 'fromFuncObject'
    };

    return _.extend(that, spec);
};

var ctx = di.createContext();
ctx.register("b", B).strategy(di.strategy.proto);
ctx.register("a", A).strategy(di.strategy.proto);
ctx.register("aWithArgs", A, 'some args').strategy(di.strategy.proto);

ctx.register("funcObjSingleton", FuncObject, {arg: "argSingleton"}).factory(di.factory.func);

// function chaining can be used to customize your object registration
ctx.register("funcObjProto", FuncObject, {arg: "argProto"})
    .strategy(di.strategy.proto)
    .factory(di.factory.func);

ctx.initialize();

var fos = ctx.get("funcObjSingleton"); // will return you a signleton instance of FuncObject
var fop = ctx.get("funcObjProto"); // will return you a new instance of FuncObject each time

console.log(fos);
console.log(fop);

ctx.get('a').toString();
ctx.get('aWithArgs').toString();
ctx.get('aWithArgs').b.toString();

