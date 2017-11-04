//core
(function() {
    "use strict";

    let startUpLog = true;
    const global = {
        UIModules: {}
    };
    let Modules = {},
        UIModules = {};

    function sLog(value1, value2 = null, value3 = null){
        if (startUpLog){
            if (value3 !== null)
                console.log(value1, value2, value3);
            else if (value2 !== null)
                console.log(value1, value2);
            else console.log(value1);
        }

    }

    function createNewUI(name, $parent) {
        //neues ele in parent
        //UIModules[module].call(context, global, $(ele) );
    }
    //defines a core module
    window.define = function(moduleName, initMethod) {
        if(Modules.hasOwnProperty(moduleName)) {
            console.error("Module name '"+ moduleName +"' taken");
        }
        Modules[moduleName] = initMethod;
        sLog("module attached: ", moduleName)
    };
    //defines a UI module
    window.defineUI = function(uiName, initMethod) {
        if(UIModules.hasOwnProperty(uiName)) {
            console.error("UI Module name '"+ uiName +"' taken");
        }
        UIModules[uiName] = initMethod;
    };
    window.onload = function() {
        sLog("init system");
        //init modules
        for(let module in Modules) {
            sLog("init module: ", module);
            if (!Modules.hasOwnProperty(module)) continue;
            let context = {};
            Modules[module].call(context, global);
            global[module] = context;
        }

        // -> document ready
        // //init UI modules
        sLog("uiModules: ", UIModules);
        for(let module in UIModules) {
            if (!UIModules.hasOwnProperty(module)) continue;
            sLog("search uiModule: ", module);
            $(module).each(function(index, ele) {
                sLog("init uiModule", ele);
                let context = {};
                UIModules[module].call(context, global, $(ele) );
                // global.UIModules[module] = context;
            });
        }



        // $.ajax({
        //     url: "/pet/1",
        //     type: "POST",
        //     // contentType: "application/json",
        //     // data: JSON.stringify(conf),
        //     success: function (resData) {
        //         console.log(resData)
        //     }
        // });
        // var DATA = $("content div h1").html();

        // let DATA = {
        //     gekkoConfig: {
        //         watch: {
        //             exchange: "poloniex"
        //         }
        //     }
        // };
        // var configForm = jsonForm($("content")[0], DATA, {
        //     meta: {
        //         gekkoConfig: {
        //             watch: {
        //                 exchange: {
        //                     type: "select",
        //                     options: ["bitfinex", "poloniex"]
        //                 },
        //                 currency: {
        //                     type: "select",
        //                     options: ["BTC"]
        //                 },
        //                 asset: {
        //                     type: "select",
        //                     options: ["ETC", "DASH", "XRP", "ETP"]
        //                 }
        //             },
        //             tradingAdvisor: {
        //                 method: {
        //                     type: "select",
        //                     options: ["UO", "MACD", "PPO"]
        //                 }
        //             }
        //         },
        //         mutator: {
        //             valuePath: {
        //                 type: "select",
        //                 options: [
        //                     "gekkoConfig/tradingAdvisor/candleSize",
        //                     "gekkoConfig/tradingAdvisor/historySize",
        //                 ]
        //             }
        //         }
        //     }
        // });
    };
})();