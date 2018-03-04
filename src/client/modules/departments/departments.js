/**
 * Created by Fry on 25.02.2018.
 */
define("departments", function(bios) {
    "use strict";

    // data service for sub components
    let dummy = false;
    let module = this;

    this.ready = new Rx.ReplaySubject();

    this.settings = {};
    this.global = {};
    this.therapySession = {};
    this.reception = {};
    this.office = {};

    this.load = (department, type, id)=>{
        init_module();
        init(department, type, id);
        return module;
    };

    function init(department, type, id){
        if(!dummy)  dummy = bios.dummy.departments(); // load dummy data
        switch (department){
            case "therapy-queue":
                init_queue();
                break;
            case "therapy-session":
                init_therapySession(type, id);
                break;
            case "reception":
                init_reception();
                break;
            case "office":
                init_office();
                break;
        }
    }

    function init_module(){
        // load settings
        // module.settings = ??
    }

    function init_queue(){
        // load Queue
        module.global.queue = dummy.queue;
    }

    function init_therapySession(type, id) {
        let therapySessionData = dummy.ts;
        if (type === "overview") {
            //load all cases by animal id
            let res = [
                {
                    id: 42,
                    description: "aua aua Bein",
                    treatments: 10,
                    date: "01.02.02",
                    lastTreatment: "20.03.03",
                }, {
                    id: 24,
                    description: "aua aua Kopf",
                    treatments: 4,
                    date: "01.12.12",
                    lastTreatment: "20.12.12",
                }, {
                    id: 35,
                    description: "aua aua Bauch",
                    treatments: 2,
                    date: "13.06.04",
                    lastTreatment: "15.06.04",
                },
            ];
            module.therapySession.cases = sortArrayByDate(res);
            // module.therapySession.customer =
            module.therapySession.customer =  getCustomerData(id, "animal");
        }
        module.therapySession.get = {
            treatment: {
                // buttons: ()=>{ return therapySessionData.filterButtons.concat(therapySessionData.newButton)},
                filterButtons: ()=>{ return therapySessionData.filterButtons },
                buttonBars: ()=>{ return therapySessionData.buttonBars },
                treatmentData: ()=> {return therapySessionData.treatmentData},
            }
        };
    }

    function init_reception(){
    }

    function init_office(){
    }

    function getCustomerData(id, of) {
        let result;
        if (of === "animal"){
            bios.search.customerData(of, id, (data)=>{
                console.log(data);
            });
        }
        return dummy.ts.customerData;
    }

    function sortArrayByDate(array) {
        array.sort((a,b)=>{
            let da = new Date(a.date).getTime();
            let db = new Date(b.date).getTime();
            return (da>db) ? 1 : (da === db) ? 0 : -1;
        });
        return array;
    }
});