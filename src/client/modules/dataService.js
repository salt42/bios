define("dataService", function(bios){
    "use strict";
    /**
     * @namespace Global
     * @property {object} dataService
     */

    let serverSearch = bios.dbService.serverSearch;

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
    let _pointer = {};
    let _pointerMax = {};
    let _singleCall = {};

    /**
     * @memberOf Global.dataService
     * @param key
     * @param data
     * @param single
     */
    this.saveMemory = (key, data, single = true)=>{
        if (!_storage[key]) {
            _storage[key] = [];
            _pointer[key] = 0;
            _singleCall[key] = (single === true);
        }
        _storage[key].push(data);
        _pointerMax[key] = _storage[key].indexOf(data);
    };

    /**
     * @memberOf Global.dataService
     * @param key
     * @returns {null}
     */
    this.getMemory = (key)=>{
        if (_storage[key]){
            let pointer = _pointer[key];
            let actual = (_storage[key][pointer]) ? _storage[key][pointer] : null;
            if(_singleCall[key] !== true && pointer + 1 === _pointerMax[key]) {
                pointer = -1;
            }
            _pointer[key] = pointer + 1;
            return actual;
        }
        return null;
    };
    /**
     * @memberOf Global.dataService
     * @param key
     */
    this.resetMemory = (key = null)=>{
        if (key === null){
            _storage = {};
            _pointer = [];
            _pointerMax = {};
            _singleCall = {};
        } else {
            delete _storage[key];
            delete _pointer[key];
            delete _pointerMax[key];
            delete _singleCall[key];
        }
    };
    /*endregion*/
});