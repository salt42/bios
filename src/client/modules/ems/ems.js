/**
 * Created by Fry on 06.02.2018.
 */
define("ems", function(bios) {
    "use strict";

    /**
     * Event Management System
     * @namespace Global
     * @property {object} ems
     */
    // Event Management System
    // console.log ('loading Event Management System');

    // register needed events
    /**
     * @memberOf Global.ems
     * @type {{queue: Rx.ReplaySubject, ts: {}, office: {}, reception: {}}}
     */
    this.departments = {
        queue: new Rx.ReplaySubject(),
        ts: {},
        office:{},
        reception: {},
    };
    /**
     * @memberOf Global.ems.departments.ts
     * @type {Rx.ReplaySubject}
     */
    this.departments.ts.stream = new Rx.ReplaySubject();

        this.onStateChange = new Rx.ReplaySubject(1);
    this.infoFeed = new Rx.ReplaySubject();
    this.flashcard = new Rx.ReplaySubject();

    this.ems_LiveSearch = function (data){
        switch (data.type){
            case 'animal':
                bios.sections.load("main-content", "mc-flashcard", function() {
                    bios.ems_data.ems_liveSearch_data(data);
                });
                break;
        }
    };



});