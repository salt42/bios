/**
 * Created by Fry on 25.02.2018.
 */
define("departments", function(bios) {
    "use strict";

    // data service for sub components
    let queue = [];
    let therapySessionData = {};

    console.log("loading deps");
    // dummy data
    let dummy = bios.dummy.departments();
    queue = dummy.queue;
    therapySessionData = dummy.ts;


    let therapySession = {
        get: {
            queue: ()=>{ return queue; },
            treatment: {
                // buttons: ()=>{ return therapySessionData.filterButtons.concat(therapySessionData.newButton)},
                filterButtons: ()=>{ return therapySessionData.filterButtons },
                buttonBars: ()=>{ return therapySessionData.buttonBars },
                treatmentData: ()=> {return therapySessionData.treatmentData}
            }
        }
    };

    this.settings = {};
    this.therapySession = therapySession;
    this.reception = {};
    this.office = {};

});