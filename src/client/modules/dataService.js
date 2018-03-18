define({
    name:"dataService",
    dependencies: ["dbService"]
}, function(bios){
    "use strict";
    /**
     * @namespace Global
     * @property {object} dataService
     */

    let self = this;
    let serverSearch = bios.dbService.serverSearch;

    /* region constants */
    const UPDATE = "update";
    const READ   = "read";
    /*endregion*/
    /**
     * @memberOf Global.dataService
     * @param id
     * @param idType
     * @returns {*}
     */
    this.customerData = function (id, idType) {
        return serverSearch("customerData/" + id, idType);
    };

    /* region Memory */
    let _storage = {};
    let _singleCall = {};

    /**
     * @memberOf Global.dataService
     * @param key
     * @param data
     * @param singleCall
     */
    this.saveMemory = (key, data, singleCall = false)=>{
        _storage[key] = data;
        _singleCall[key] = (singleCall === true);
        PS.pushItem(key, UPDATE);
    };

    /**
     * @memberOf Global.dataService
     * @param key
     * @returns {null}
     */
    this.getMemory = (key)=>{
        if (_storage[key]){
            let result = _storage[key];
            PS.pushItem(key, READ);
            if (_singleCall[key]) self.resetMemory(key);
            return result;
        }
        return null;
    };
    /**
     * @memberOf Global.dataService
     * @param key
     */
    this.resetMemory = (key = null)=>{
        if (key === null){
            PS.reset();
            _storage = {};
            _singleCall = {};
        } else {
            if(PS.check(key)) PS.api.remove(key);
            delete _storage[key];
            delete _singleCall[key];
        }
    };
    /*endregion*/
    /*region Push Service --PS */
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
    /**
     * Push Service keys object
     * @type {{memoryKey: string}}
     */
    PS.keys = [];
    /**
     * @memberOf Global.dataService.pushService.api
     * @memberOf Global.pushService.api
     * @memberOf Global.dataService.pushServiceAPI
     * @param key
     */
    PS.api.add = (key)=>{
        if(PS.keys.indexOf(key) === -1){
            PS.keys.push(key);
            PS.events[key] = new Rx.ReplaySubject();
            if (_storage[key])
                PS.events[key].next(UPDATE);
        }
    };
    /**
     * @memberOf Global.dataService.pushService.api
     * @memberOf Global.pushService.api
     * @memberOf Global.dataService.pushServiceAPI
     * @param key
     */
    PS.api.remove = (key)=>{
        let i = PS.keys.indexOf(key);
        if (i > -1) {
            delete PS.events[PS.keys[i]];
            PS.keys.splice(i, 1);
        }
    };
    /**
     *
     * @param key
     * @returns {boolean}
     */
    PS.api.check = (key)=>{
        return PS.keys.indexOf(key) > -1;
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
    /**
     * @memberOf Global.dataService.pushService.api
     * @memberOf Global.pushService.api
     * @memberOf Global.dataService.pushServiceAPI
     * @param key
     */
    PS.reset = ()=>{
        PS = psObject();
    };
    /**
     * api
     * @type {*}
     */
    PS.events.api = PS.api;


    bios.pushService = PS.events;
    /**
     * @memberOf Global.dataService
     * @type {*}
     */
    this.pushService = PS.events;

    /**
     * @memberOf Global.dataService
     * @type {*}
     */
    this.pushServiceAPI = PS.api;

    /*endregion*/
});