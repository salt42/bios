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
    therapySessionData.filterButtons = dummy.ts.filterButtons;
    therapySessionData.newButton = dummy.ts.newButton;
    therapySessionData.newButtons = dummy.ts.newButtons;
    therapySessionData.treatmentData = dummy.ts.treatmentData;
    therapySessionData.deleteButtons = dummy.ts.deleteButtons;


    let therapySession = {
        get: {
            queue: ()=>{ return queue; },
            treatment: {
                // buttons: ()=>{ return therapySessionData.filterButtons.concat(therapySessionData.newButton)},
                buttons: ()=>{ return therapySessionData.filterButtons },
                newButton: ()=>{ return therapySessionData.newButton },
                newButtons: ()=>{ return therapySessionData.newButtons },
                deleteButtons: ()=> { return therapySessionData.deleteButtons },
                treatmentData: ()=> {return therapySessionData.treatmentData}
            }
        }
    };

    this.settings = {};
    this.therapySession = therapySession;
    this.reception = {};
    this.office = {};

});