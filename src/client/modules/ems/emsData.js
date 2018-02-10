/**
 * Created by Fry on 09.02.2018.
 */
define("ems_data", function(bios) {
    "use strict";

    // Event Management System Data Getter
    let EMS = bios.ems;

    this.ems_liveSearch_data = function (data){
        bios.search.mainDetails(data.type, data.id, function (mainDetails) {

            mainDetails.animal.sort ( sortByName );
            mainDetails.owner.sort ( sortByName );

            EMS.onStateChange.next({
                state: "liveSearch",
                request: data,
                data: mainDetails,
            });
        });
    };

    function sortByName(a,b){
        a.name = (!a.name || a.name === null || a.name === "") ? bios.trans.late("unknown") : a.name;
        b.name = (!b.name || b.name === null || b.name === "") ? "unknown" : b.name;
        return ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0));
    }
});