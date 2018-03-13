define("dbService", function(bios){
    "use strict";
    /**
     * @namespace Global
     * @property {object} dbService
     */

    /**
     * @memberOf Global.dbService
     * @param type
     * @param searchQuery
     * @returns {*}
     */
    this.serverSearch = function(type, searchQuery) {
        let url = "/search/" + type;
        if (searchQuery !== null) url += "/" + searchQuery;
        return $.ajax({
            url: url,
            type: "GET"
        });
    }
});