/**
 * Created by Fry on 20.03.2018.
 */
define({
    name: "pushService",
    dependencies: ["dataService"]
}, function(bios) {
    "use strict";
    /**
     * @namespace Global
     * @property {object} pushService
     */

    let self = this;

    /* region constants */
    const UPDATE = "update";
    const READ   = "read";
    /*endregion*/

    /* region push service */

    /**
     *
     * @returns {{api: {}, keys: {memoryKey: string}, events: {}, reset: (function())}}
     */
    function psObject () {
        return {
            api: {},
            keys: {},
            events: {},
            reset:  ()=>{
                PS = psObject;
            }
        };
    }
    let PS = psObject();

    PS.api.check = (key)=>{
        return !!PS.keys[key];
    };
    PS.api.add = (key)=>{
        if(!PS.api.check(key)){
            PS.keys[key] = key;
            PS.events[key] = new Rx.ReplaySubject(1); //@todo check behavior with ...ReplaySubject(1) when streaming "read";
            // @todo...                                         ((..ySubject(2) worked so far 1= read ((from using DUMMY that reads)) 2= udate** that could be the reason it will be tricky^^
            if (bios.dataService.gotMemory(key))
                PS.events[key].next(UPDATE);
        }
    };
    PS.api.remove = (key)=>{
        if (PS.api.check(key)) {
            delete PS.events[key];
            delete PS.keys[key]
        }
    };
    /**
     *
     * @param key
     * @param feedData
     */
    PS.pushItem = (key, feedData)=>{
        if(PS.api.check(key))
            PS.events[key].next(feedData);
    };
    PS.reset = ()=>{
        PS = psObject();
    };
    /**
     * @memberOf Global.pushService
     * @type {{}}
     */
    this.events = PS.events;
    /**
     * @memberOf Global.pushService
     * @type {{}}
     */
    this.api = PS.api;
    /*endregion*/
    /*region overwrite dataService*/

    bios.dataService._pushService_saveMemory = (key, data, singleCall)=>{PS.pushItem(key, UPDATE);};

    bios.dataService._pushService_getMemory = (key)=>{
        if(key !== null){
            // @todo streaming read, too
            // PS.pushItem(key, READ);
        }
    };
    bios.dataService._pushService_resetMemory = (key)=>{
        if(key === null)
            PS.reset();
        else if(PS.api.check(key))
            PS.api.remove(key);
    };

    bios.dataService.PS.workaround = (key)=>{
        PS.events[key].next("update"); // done with save when dummy is bypassed
    };
    /*endregion*/
});