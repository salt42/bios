(function() {

    var listOfAllTables = [];
    let helper = {};
    let dtconf = {};
    // get config;
    $.getScript("/js/config/dtc.js", function (data, textStatus, jqxhr) {
        dtconf = window.dtc;
    });
    // set free global window.dtc
    window.dtc = {};

    defineUI("dataTable", function (bios, $element) {
        "use strict";
        console.log ('dtconf: ',dtconf);

        let dataTable = {};

        let table = ($element.data("table"));
        if ( table in dtconf.table) {
            dataTable = dtconf.table[table];
        } else {
            dataTable = dtconf.table["default"];
        }

        // $element.append(list);

        this.updateData = function () {
            // updatedata;
            dataTable.data = null;  // @todo get data by dataTable.name
            dataTable.allColumns = helper.getAllColumns(dataTable.data);
            listOfAllTables[dataTable.name] = dataTable;
        },

        this.getHTML = function () {
            // validation
            if (dataTable.data === null) return;
            if (dataTable.columns.isEmpty()) setColumns("all");
            // save
            listOfAllTables[dataTable.name] = dataTable;
            // create HTML
            let headsHTML = helper.getHTMLHead(dataTable);
            let html = '<table class="display" cellspacing="0" width="100%"><thead>' + headsHTML + '</thead><tbody>';
            html += helper.getHTMLData(dataTable);
            html += '</tbody><tfoot>' + headsHTML + '</tfoot></table>';

            return html;
        }
    });
})();