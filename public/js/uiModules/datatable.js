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
            // DATA
        this.setData = function (name, data = []) {
            dataTable.name = name;
            if (data.isEmpty()){
                if(name in listOfAllTables) dataTable = listOfAllTables[name];
                else updateData();
            }
            else {
                dataTable.name = name;
                dataTable.data = data;
                dataTable.allColumns = helper.getAllColumns(dataTable.data);
            }
            listOfAllTables[name] = dataTable;
        },

        this.updateData = function () {
            // updatedata;
            dataTable.data = null;  // @todo get data by dataTable.name
            dataTable.allColumns = helper.getAllColumns(dataTable.data);
            listOfAllTables[dataTable.name] = dataTable;
        },

        this.setColumns = function (columns){
            if ((typeof columns === "string") && columns === "all") {
                dataTable.columns = dataTable.allColumns;
                return;
            }
            if(Array.isArray(columns)) {
                dataTable.columns = columns;
                return;
            }
            return; // ERR: no valid "columns"
        },
        this.addColumns = function (name, columnNumber = null){
            if (!(name in dataTable.allColumns)) return; // ERR Column not found
            if (columnNumber === null) {
                dataTable.columns.push(name);
            } else {
                dataTable.columns = helper.insertInArray(columnNumber, name, dataTable.columns);
            }
        },
        this.removeColumns = function (name) {
            if (typeof name === "string") {
                dataTable.columns = helper.spliceArrayByValue(name, dataTable.columns);
                return;
            }
            if(Array.isArray(name)) {
                for (let i = 0; i < name.length; i++){
                    dataTable.columns = helper.spliceArrayByValue(name[i], dataTable.columns);
                }
                return;
            }
            return; // ERR?
        },
        this.reorderColumn = function (columnName, columnNumber = null){
            dataTable.columns = helper.spliceArrayByValue(columnName, dataTable.columns);
            dataTable.columns = helper.insertInArray(columnNumber, columnName, dataTable.columns);
        },
        this.addButtonInColumns = function (columnName, buttonSetupArray, columnNumber = null){
            if (columnName in dataTable.data) columnName += ' Action';
            if (columnNumber === null){
                dataTable.columns.push(columnName);
                dataTable.data[columnName] = buttonSetupArray;
            }
        }

            // HTML
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
 // helper
    helper.insertInArray = function (index, value, inArray) {
        let max = inArray.length;
        for (let i = max; i > index; i--){
            inArray[i] = inArray[i-1]
        }
        inArray[index] = value;
        return inArray;
    }
    helper.spliceArrayByValue = function (name, arr) {
        if (name in arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === name) {
                    arr.splice(i, 1);
                    return arr;
                }
            }
        }
    }
    helper.getKeyByValue = function (name, arr) {
        if (name in arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === name) {
                    return i;
                }
            }
        }
    }

    helper.getAllColumns = function (data){
        "use strict";
        let names = [];
        data[0].forEach(function (key, value) {
            names.push(key);
        });
        return names;
    }

    helper.getHTMLHead = function (dataTable){
        "use strict";
        let html = "<tr>";
        for(let i = 0; i < dataTable.columns.length; i++) {
            html += '<th>' + dataTable.columns[i] + '</th>';
        };
        html += '</tr>';
        return html;
    }
    helper.getHTMLData = function (dataTable){
        "use strict";
        let html = "";
        let columnNames = dataTable.columns;
        for (let i = 0 ; i < dataTable.data.length; i++){
            html += '<tr>';
            for (let ii = 0; ii < columnNames.length; ii++) {
                html +=  '<td>' + dataTable.data[columnNames[ii]] + '</td>';
            }
            html += '</tr>';
        }
        return html;
    }
})();