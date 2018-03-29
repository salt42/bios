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

    this.PS = {};
    this.PS.workaround = (key)=>{};
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
        this.PS.workaround("caseList");
        return self.getMemory("caseList");
    };
    /**
     * @memberOf Global.dataService
     * @param caselId
     */
    this.treatList = (caseId)=>{
        // get treat list
        // save to memory (until implementation of Server set from Dummy)
        this.PS.workaround("treatList");
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
        self._pushService_saveMemory(key, data, singleCall);
    };

    /**
     * @memberOf Global.dataService
     * @param key
     * @returns {null}
     */
    this.getMemory = (key)=>{
        let result = null;
        if (_storage[key]){
            result = _storage[key];
            if (_singleCall[key]) self.resetMemory(key);
        }
        self._pushService_getMemory(key);
        return result;
    };
    /**
     * @memberOf Global.dataService
     * @param key
     */
    this.resetMemory = (key = null)=>{
        if (key === null){
            _storage = {};
            _singleCall = {};
        } else {
            delete _storage[key];
            delete _singleCall[key];
        }
        self._pushService_resetMemory(key);
    };
    /* region push service injection */
    this._pushService_saveMemory = (key, data, singleCall)=>{};
    this._pushService_getMemory = (key)=>{};
    this._pushService_resetMemory = (key)=>{};
    /*endregion*/
    /**
     * @memberOf Global.dataService
     * @param key
     * @returns {boolean}
     */
    this.gotMemory = (key)=>{
        return !!_storage[key];
    }
    /*endregion*/
});