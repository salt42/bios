//core
(function() {
    "use strict";

    const global = {
        // UIModules: {}
    };
    let Modules = {},
        UIModules = {},
        Components = {};

    //defines a core module
    window.define = function(moduleName, initMethod) {
        if(Modules.hasOwnProperty(moduleName)) {
            console.error("Module name '"+ moduleName +"' already taken");
        }
        Modules[moduleName] = initMethod;
    };
    //defines a component
    window.defineComp = function(compName, initMethod) {
        if(Components.hasOwnProperty(compName)) {
            console.error("Component name '"+ compName +"' already taken");
        }
        Components[compName] = initMethod;
    };
    //defines a UI module
    window.defineUI = function(uiName, initMethod) {
        if(UIModules.hasOwnProperty(uiName)) {
            console.error("UI Module name '"+ uiName +"' already taken");
        }
        UIModules[uiName] = initMethod;
    };




    global.getActiveComponent = function(sectionName) {
        let $section = $('section[name="'+ sectionName +'"]');
        if ($section.length < 0) {
            throw new Error("section with name '"+ sectionName+"' not found");
        }
        return $section.data("context");
    };

    global.loadComponent = function(componentName, sectionName, args) {
        if (!Components.hasOwnProperty(componentName)) {
            throw Error("component with name '"+ componentName +"' not found");
        }
        let $section = $('section[name="'+ sectionName +'"]');
        if ($section.length === 0) {
            throw Error("section with name '"+ sectionName +"' not found");
        }
        //unload current component
        let oldCtx = $section.data("context");
        if (oldCtx && oldCtx.hasOwnProperty("onDiscard") && typeof oldCtx.onDiscard === "function") {
            oldCtx.onDiscard.call(oldCtx);
        }
        $section.empty();
        let ctx = {};
        $section.data("context", ctx);
        Components[componentName].call(ctx, global, $($section[0]), args);
    };

    function initUIModule(moduleName, $ele) {
        if (!UIModules.hasOwnProperty(moduleName)) return;
        let ctx = {};
        // if (!$ele.data("context") ) return;
        $ele.data("context", ctx);
        UIModules[moduleName].call(ctx, global, $ele);
    }
    //@todo die 2 funktionen fertig bauen und bessere namen finden
    global.initUI = function($element) {
        let moduleName = $element.tagName;
        if (!UIModules.hasOwnProperty(moduleName)) {
            //@todo error "element is not a uiModule"
            return;
        }
        initUIModule(moduleName, $element);
    };
    global.initAllUI = function($parent) {
        for(let moduleName in UIModules) {
            if (!UIModules.hasOwnProperty(moduleName)) continue;
            $(moduleName, $parent).each(function(index, ele) {
                initUIModule(moduleName, $(ele));
            });
        }
    };

    //@todo overwriteable error functions    think through
    global.error = function(id, title, msg) {
        throw new Error(msg);
    };
    global.fatalError = function(msg) {
        throw new Error(msg);
    };


    window.onload = function() {
        //init modules
        for(let module in Modules) {
            if (!Modules.hasOwnProperty(module)) continue;
            let context = {};
            Modules[module].call(context, global);
            global[module] = context;
        }
        // -> document ready

        // //init UI modules
        global.initAllUI($("body"));

        //search sections with default comp and load component's
        let sections = [];
        $("section").each(function () {
            let sectionName = $(this).attr("name"),
                defaultComp = $(this).attr("default");

            if (!sectionName) {
                //@todo show error "section's need a name attribute"
                return;
            }
            //check if section name is already taken
            if (sections.indexOf(sectionName) > -1) {
                //@todo error "there are duplicate sections with name ''"
                return;
            }
            sections.push(sectionName);
            if (defaultComp) {
                if (!Components.hasOwnProperty(defaultComp)) {
                    //@todo show error "no component with this name"
                    return;
                }
                //loadComp
                global.loadComponent(defaultComp, sectionName, {});
            }
        });

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