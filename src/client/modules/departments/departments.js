/**
 * Created by Fry on 25.02.2018.
 */
define({
    name: "departments",
    dependencies: ["ems", "dataService", "dummy"],
}, function(bios) {
    "use strict";
    /**
     * @namespace Global
     * @property {object} departments
     */

    // data service for sub components
    let dummy = false;
    let module = this;
    let therapySessionData = {};
    let initialized = {
        module: false,
        queue:  false,
        other:  new Rx.ReplaySubject(),
    };

    this.events = {};
    this.settings = {};
    this.global = {};
    this.therapySession = {};
    this.reception = {};
    this.office = {};

    /**
     * @memberOf Global.departments
     * ready ...
     * @type {Rx.ReplaySubject}
     */
    this.ready = new Rx.ReplaySubject(10);

    /**
     * @memberOf Global.departments
     * load ... get all needed data
     * @param department
     * @param comp
     * @param id
     * @param idType string type belonging to id
     */
    this.load = (department, comp, id, idType)=>{
        let a = [];
        let iniData = {
            department: department,
            comp: comp,
            id: id,
            idType: idType,
        };
        a.push( _load_module(iniData) );
        a.push( _load(iniData) );
        Promise.all(a).then ( function() {
            module.ready.next(iniData);
        });
    };

    /**
     * _load_module ... loads global settings
     * @returns {Promise}
     * @private
     */
    function _load_module(iniData){
        return new Promise(function (resolve, reject){
            if (!initialized.module){
                // load settings
                // module.settings = ??
                initialized.module = true;
                initialized.other.next({
                    type: "module",
                    data: {},
                });
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
                    /* usage of _load_TS_dispatcher is not so nice reading, but leads to direct (pseudo dynamic) function calls instead of multiple ifs
                       & reduces this switch to default + special cases (departments with dash)*/
                    if(_load_dispatcher["ts"][iniData.comp]){
                        a.push( _load_dispatcher["ts"][iniData.comp](iniData) );
                    }
                    break;
                default:
                    if(_load_dispatcher[iniData.department][iniData.comp])
                        a.push( _load_dispatcher[iniData.department][iniData.comp](iniData) );
                    break;
            }
            Promise.all(a).then( function(){
                resolve();
            } );
        });
    }

    /**
     * _load_treatmentQueue ... loads/ refreshes data for treatment queue
     * @returns {Promise}
     * @private
     */
    function _load_treatmentQueue(){
        if (!initialized.queue){
            return new Promise(function (resolve, reject){
                module.events.queue = new Rx.ReplaySubject();
                console.log('adsdas', bios.dataService.getMemory("ts-queue"));

                let res = modifyQueue(bios.dataService.getMemory("ts-queue"));
                module.global.treatmentQueue = {
                    queue: res,
                    next:  res[0],
                };
                resolve(module.global.treatmentQueue);
                initialized.other.next({
                    type: "ts-queue",
                    data: module.global.treatmentQueue.next,
                });
            });
        }

    }
    function modifyQueue (data){
        let res = [];
        for (let i = 0; i < data.length; i++) {
            data[i].buttonText = (i === 0) ? bios.trans.late("next treatment") : bios.trans.late("later treatments");
            data[i].url = "/therapySession/treatment/" + data[i].animal_id;
            res.push(data[i]);
        }
        return res;
    }
    //
    // console.log(bios.pushService["ts-queue"]);
    bios.pushService["ts-queue"].subscribe(function(rxData){
        if (rxData === "update"){
            if(!initialized.queue){
                _load_treatmentQueue();
            } else {
                let res = modifyQueue(bios.dataService.getMemory("ts-queue"));
                module.global.treatmentQueue = {
                    queue: res,
                    next:  res[0],
                };
            }
        }
    });

    /* region Therapy Session */
    /**
     *
     * @type {{therapySessionAnimalOverview: _load_therapySessionAnimalOverview, therapySessionTreatment: _load_therapySessionTreatment}}
     * @private
     */
    let _load_dispatcher = {
        ts: {
            therapySessionCustomerDataView: _load_therapySessionCustomerDataView,
            therapySessionAnimalOverview:   _load_therapySessionAnimalOverview,
            therapySessionTreatment:        _load_therapySessionTreatment,
            dashboard:                      _load_dashboard,
        },
        reception: {},
        office: {},
    };

    function _load_therapySessionCustomerDataView(iniData) {
        return _get_customerData(iniData).then(function(){
            module._createAPI['ts']['customerData']();
        });
    }
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
            // a.push( _load_TS_customerData("animal", iniData.id) );

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
    function _load_therapySessionTreatment(iniData) {
        return new Promise(function (resolve, reject){
            let a = [];
            a.push( _load_therapySessionCustomerDataView(iniData));
            Promise.all(a)
                .then(function(){
                    // module._createAPI["ts"][iniData.comp];
                    initialized.therapySession = iniData;
                    resolve();
                });
        });
    }
    function _load_dashboard(inidata) {
        return new Promise(function (resolve, reject){
            _load_treatmentQueue().then(function(){
                let dash_defaults = [{
                    type: "element::text",
                    element: 'therapy-queue',
                    text: "therapy-queue",
                    buttonUrl: "/therapySession/queue"
                },{
                    type: "html::text",
                    text: "<div class='settings-icon'></div>",
                    buttonText: "Settings",
                    buttonUrl: "/therapySession/settings"
                },];

                module.therapySession.dashboard = {};
                module.therapySession.cards = [];
                //load data
                // module.therapySession.cards = dashDummy(2, data);
                console.log(module.global.treatmentQueue.next);
                let next = module.global.treatmentQueue.next;
                module.therapySession.cards = [{
                    type: "html::text",
                    text: '<div>' + next.first_name + ' ' + next.name + '<br>' +
                            next.animal + '<br>' +
                            next.reason + '<br></div>',
                    buttonText: next.animal,
                    buttonUrl: "/therapySession/treatment/" + next.animal_id,
                    variables: true,
                }];
                module.therapySession.cards = module.therapySession.cards.concat(dash_defaults);
                resolve();
            });
        });
    }
    function dashDummy (count, data) {
        let i = 0;
        while (i < count) {
            i++;
            data.push({
                type: "text::text",
                text: "type text::text",
                buttonText: "type text::text",
                buttonUrl: ""
            });
            data.push({
                type: "html::text",
                text: "<div style='background: blue; width: 30px; height:30px;'></div>",
                buttonText: "Settings (type html::text)",
                buttonUrl: ""
            });
            data.push({
                type: "img::html",
                text: "/img/ui-kit/default/employ_male.png",
                buttonText: "<span>type img::html</span>",
                buttonUrl: ""
            });
        }
        return data;
    }

    function _load_TS_cases(id) {
        return new Promise(function (resolve, reject){
            module.therapySession.cases = sortArrayByDate(dummy.ts.cases);
            //@todo real load
            resolve();
        });
    }
    function _get_customerData(iniData) {
        return new Promise(function (resolve, reject){
            let customerData;
            bios.dataService.customerData(iniData.idType, iniData.id).then(function(data){
                customerData = data;
                therapySessionData.customerData = customerData;
                resolve();
            });
        });
    }
    module._createAPI = {
        common: (sub)=>{
            if(sub === "ts"){
                if(!module.therapySession.get) module.therapySession.get = {};
            }
        },
        ts: {
            customerData: ()=>{
                module._createAPI.common("ts");
                module.therapySession.get.customerData = ()=>{
                    return therapySessionData.customerData
                }
            },
            therapySessionTreatment: ()=>{
                module._createAPI.common("ts");
                module.therapySession.get = {
                    treatment: {
                        filterButtons: ()=>{ return therapySessionData.filterButtons },
                        buttonBars: ()=>{ return therapySessionData.buttonBars },
                        treatmentData: ()=> {return therapySessionData.treatmentData},
                    }
                };
            }
        }
    };
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