//core
(function() {
    "use strict";

    const global = {
        UIModules: {}
    };
    let Modules = {},
        UIModules = {};


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
    };
    //defines a UI module
    window.defineUI = function(uiName, initMethod) {
        if(UIModules.hasOwnProperty(uiName)) {
            console.error("UI Module name '"+ uiName +"' taken");
        }
        UIModules[uiName] = initMethod;
    };
    window.onload = function() {
        console.log("init system");
        //init modules
        for(let module in Modules) {
            if (!Modules.hasOwnProperty(module)) continue;
            let context = {};
            Modules[module].call(context, global);
            global[module] = context;
        }

        // -> document ready
        // //init UI modules
        console.log(UIModules);
        for(let module in UIModules) {
            if (!UIModules.hasOwnProperty(module)) continue;
            console.log("search uiModule: ", module);
            $(module).each(function(index, ele) {
                console.log("init module", ele);
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