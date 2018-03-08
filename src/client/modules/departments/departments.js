/**
 * Created by Fry on 25.02.2018.
 */
define("departments", function(bios) {
    "use strict";

    // data service for sub components
    let dummy = false;
    let module = this;
    let therapySessionData;
    let initialized = {
        module: false,
        loadTherapySession: {},
    };

    this.ready = new Rx.ReplaySubject();

    this.settings = {};
    this.global = {};
    this.therapySession = {};
    this.reception = {};
    this.office = {};

    /**
     * load ... get all needed data
     * @param department
     * @param comp
     * @param id
     * @param idType string type belonging to id
     * @returns {Promise}
     */
    this.load = (department, comp, id, idType)=>{
        return new Promise(function (resolve, reject){
            let a = [];
            let iniData = {
                department: department,
                comp: comp,
                id: id,
                idType: idType,
            };
            a.push( _load_module() );
            a.push( _load(iniData) );

            Promise.all(a).then ( function() {
                module.ready.next(iniData);
                resolve();
            });
        });
    };

    /**
     * _load_module ... loads global settings
     * @returns {Promise}
     * @private
     */
    function _load_module(){
            return new Promise(function (resolve, reject){
            if (!initialized.module){
                // load settings
                // module.settings = ??
                initialized.module = true;
            }
            resolve();
        });
    }

    /**
     * _load ... dispatches load methods by department param
     * @param   iniData     object
     * @returns {Promise}
     * @private
     */
    function _load(iniData){
        return new Promise(function (resolve, reject){
            let a =[];
            if(!dummy)  dummy = bios.dummy.departments(); // load dummy data
            switch (iniData.department){
                case "therapy-queue":
                    a.push( _load_treatmentQueue() );
                    break;
                case "therapy-session":
                    therapySessionData = dummy.ts;
                    /* usage of _load_TS_dispatcher is not so nice reading,
                       but leads to direct (pseudo dynamic) function calls instead of multiple ifs
                       & reduces this switch to default + special cases (departments with dash)*/
                    if(_load_dispatcher["ts"][iniData.comp])
                        a.push( _load_dispatcher["ts"][iniData.comp](iniData) );
                    break;
                default:
                    // if(_load_dispatcher[iniData.department][iniData.comp])
                        // a.push( _load_dispatcher[iniData.department][iniData.comp](iniData) );
                    break;
            }
            Promise.all(a).then( resolve() );
        });
    }

    /**
     * _load_treatmentQueue ... loads/ refreshes data for treatment queue
     * @returns {Promise}
     * @private
     */
    function _load_treatmentQueue(){
        return new Promise(function (resolve, reject){
            module.global.treatmentQueue = dummy.queue;
            // load Queue
            resolve();
        });
    }

    /* region Therapy Session */
    /**
     *
     * @type {{therapySessionAnimalOverview: _load_therapySessionAnimalOverview, therapySessionTreatment: _load_therapySessionTreatment}}
     * @private
     */
    let _load_dispatcher = {
        ts: {
            therapySessionAnimalOverview: _load_therapySessionAnimalOverview,
            therapySessionTreatment:      _load_therapySessionTreatment,
        },
        reception: {},
        office: {},
    };

    /**
     * _load_therapySessionAnimalOverview ... load all needed data ´for overview
     * @param iniData
     * @returns {Promise}
     * @private
     */
    function _load_therapySessionAnimalOverview(iniData) {
        return new Promise(function (resolve, reject){
            let a = [];
            //load all cases by animal id
            a.push( _load_TS_cases(iniData.id) );
            a.push( _load_TS_customerData("animal", iniData.id) );

            Promise.all(a)
                .then(function(){
                    _createAPI_therapySession(iniData.comp);
                    initialized.therapySession = iniData;
                    resolve();
                });
        });
    }
    /**
     * _load_therapySessionTreatment ... loads all needed data for treatment
     * @param iniData
     * @param resolve
     * @returns {Promise}
     * @private
     */
    function _load_therapySessionTreatment(iniData, resolve) {
        return new Promise(function (resolve, reject){
            let a = [];
            a.push( _load_TS_customerData(iniData.idType, iniData.id) );

            Promise.all(a)
                .then(function(){
                    _createAPI_therapySession(iniData.comp);
                    initialized.therapySession = iniData;
                    resolve();
                });
        });
    }

    function _load_TS_cases(id) {
        return new Promise(function (resolve, reject){
            module.therapySession.cases = sortArrayByDate(dummy.ts.cases);
            //@todo real load
            resolve();
        });
    }
    function _load_TS_customerData(type, id) {
        //@todo  -- promise fails in this way
        // return bios.search.customerData(type, id).then( function (data){
        //     module.therapySession.customer = data;
        // });
    }
    function _createAPI_therapySession(comp) {
        if (comp === "therapySessionTreatment"){
            therapySessionData = sortArraysByDate_recursive(therapySessionData);
            module.therapySession.get = {
                treatment: {
                    filterButtons: ()=>{ return therapySessionData.filterButtons },
                    buttonBars: ()=>{ return therapySessionData.buttonBars },
                    treatmentData: ()=> {return therapySessionData.treatmentData},
                }
            };
        }
    }
    /*endregion*/
    /* region Reception */
    function _load_reception(){
    }
    /*endregion*/
    /* region Office */
    function _load_office(){
    }
    /*endregion*/
    /* region Auxiliaries */
    function sortArraysByDate_recursive(array){
        if (!Array.isArray(array)) return array;
        else {
            let res = [];
            for (let i = 0; i < array.length; i++) {
                let obj = array[i];
                if (!Array.isArray(obj)) res[i] = obj;
                else res[i] = sortArraysByDate_recursive(obj);
            }
            return res;
        }
    }

    function sortArrayByDate(array) {
        return (array.date) ? array.sort( _sortByDate ) : array;
    }

    function _sortByDate(a,b) {
        let da = new Date(a.date).getTime();
        let db = new Date(b.date).getTime();
        return (da > db) ? 1 : (da === db) ? 0 : -1;
    }
    /*endregion*/
});