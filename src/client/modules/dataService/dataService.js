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
     * @memberOf Global.departments
     * @param keyword
     * @returns {*}
     */
    this.load = (keyword)=>{
        if(_load[keyword]) return _load[keyword](keyword);
    };
    let _load = {
        tsQueue: (key)=>{
            return new Promise(function (resolve, reject){
                let a = [];
                // let serverData = get queue from server
                // a.push ( getServerData.then(function(data)=>{
                // self.saveMemory(key, data)
                // }));
                //dummy workaround
                let data = self.getMemory(key);
                self.saveMemory(key, data);
                Promise.all(a).then(resolve);
            });
        }
    };

    /**
     * @memberOf Global.dataService
     * @param id
     * @param idType
     * @returns {*}
     */
    this.customerData = function (id, idType) {
        return serverSearch("customerData/" + id, idType);
    };
    /**
     * @memberOf Global.dataService
     * @param animalId
     */
    this.caseList = (animalId)=>{
        // get case list
        // save to memory (until implementation of Server set from Dummy)
        PS.events.caseList.next(UPDATE); // done with save when dummy is bypassed
        return self.getMemory("caseList");
    };
    /**
     * @memberOf Global.dataService
     * @param caselId
     */
    this.treatList = (caseId)=>{
        // get treat list
        // save to memory (until implementation of Server set from Dummy)
        PS.events.treatList.next(UPDATE); // done with save when dummy is bypassed
        return self.getMemory("treatList");
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
            // @todo streaming read, too
            // PS.pushItem(key, READ);
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
            if(PS.api.check(key)) PS.api.remove(key);
            delete _storage[key];
            delete _singleCall[key];
        }
    };
    /**
     * @memberOf Global.dataService
     * @param key
     * @returns {boolean}
     */
    this.gotMemory = (key)=>{
        return !!_storage[key];
    }
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
     * @namespace Global
     * @property {object} pushService
     * @type {{events: {}, api: {}}}
     */
    bios.pushService = {
        events: PS.events,
        api: PS.api
    };
    /*endregion*/
});