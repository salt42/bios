/**
 * Created by Fry on 06.02.2018.
 */
define("ems", function(bios) {
    "use strict";

    // Event Management System

    // register needed events
    this.onStateChange = new Rx.ReplaySubject();


    this.ems_LiveSearch = function (data){
        switch (data.type){
            case 'animal':
                bios.sections.load("main-content", "mc-flashcard", function() {
                    console.log("ems-livesearch loaded fc");
                    this.onStateChange.next({ // der feuert wenn fc geladen is
                        state: "liveSearch",
                        data: data
                    });
                }.bind(this));

                break;
        }
        //also was meinst du mit alle

    };

});