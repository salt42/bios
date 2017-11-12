(function() {
    let dtconf = {};
    // get config;
    $.getScript("/js/config/dtc.js", function (data, textStatus, jqxhr) {
        dtconf = window.dtc;
    });
    // set free global window.dtc
    window.dtc = {};

    defineUI("dataTable", function (bios, $element) {
        "use strict";

        let dataTable = {
            data: null,
            allColumns: [],
            columns: [],
            renameColumns: [],
            config: {
                ordering: true,
                select: true,
            }
        };

        this.setData = function(data, options = null) {
            if (Object.keys(options).length === 0){
                dataTable = dtconf["default"];
            } else {
                if (options.name){
                    dataTable = dtconf[options.name];
                }
            }
            dataTable.data = data;
            dataTable.allColumns = this.getAllColumns(dataTable.data);
        };

        this.setColumns = function (columns){
            if ((typeof columns === "string") && columns === "all") {
                dataTable.columns = dataTable.allColumns;
                return;
            }
            if(Array.isArray(columns)) {
                dataTable.columns = columns;
            }
        };
        this.addColumns = function (name, columnNumber = null){
            if (!(name in dataTable.allColumns)) return; // ERR Column not found
            if (columnNumber === null) {
                dataTable.columns.push(name);
            } else {
                dataTable.columns = this._insertInArray(columnNumber, name, dataTable.columns);
            }
        };
        this.removeColumns = function (name) {
            if (typeof name === "string") {
                dataTable.columns = this._spliceArrayByValue(name, dataTable.columns);
                return;
            }
            if(Array.isArray(name)) {
                for (let i = 0; i < name.length; i++){
                    dataTable.columns = this._spliceArrayByValue(name[i], dataTable.columns);
                }
            }
        };
        this.reorderColumn = function (columnName, columnNumber = null){
            dataTable.columns = this._spliceArrayByValue(columnName, dataTable.columns);
            dataTable.columns = this._insertInArray(columnNumber, columnName, dataTable.columns);
        };
        this.addButtonInColumns = function (columnName, buttonSetupArray, columnNumber = null){
            if (columnName in dataTable.data) columnName += ' Action';
            if (columnNumber === null){
                dataTable.columns.push(columnName);
                dataTable.data[columnName] = buttonSetupArray;
            }
        };

        this.setColumnRename = function (columnName, renameColumns){
            dataTable.renameColumns[columnName] = renameColumns;
        };
        this._renameColumns = function (columnName){
            if (!dataTable.renameColumns || !dataTable.renameColumns[columnName]){
                return trans(columnName);
            } else {
                return dataTable.renameColumns[columnName];
            }
        }

        this.getHTML = function () {
            // validation
            if (dataTable.data === null) return;
            if (dataTable.columns.length < 1) this.setColumns("all");

            // create HTML
            let headsHTML = this.getHTMLHead(dataTable);
            let html = '<table class="display" cellspacing="0" width="100%"><thead>' + headsHTML + '</thead><tbody>';
            html += this.getHTMLData(dataTable);
            html += '</tbody><tfoot>' + headsHTML + '</tfoot></table>';

            return html;
        };

        // helper
        this._insertInArray = function (index, value, inArray) {
            let max = inArray.length;
            for (let i = max; i > index; i--){
                inArray[i] = inArray[i-1]
            }
            inArray[index] = value;
            return inArray;
        };
        this._spliceArrayByValue = function (name, arr) {
            if (name in arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === name) {
                        arr.splice(i, 1);
                        return arr;
                    }
                }
            }
        };
        this._getKeyByValue = function (name, arr) {
            if (name in arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === name) {
                        return i;
                    }
                }
            }
        };

        this.getAllColumns = function (data){
            "use strict";
            let names = [];
            for(let property in data[0]){
                names.push(property);
            }
            return names;
        };

        this.getHTMLHead = function (dataTable){
            "use strict";
            let html = "<tr>";
            for(let i = 0; i < dataTable.columns.length; i++) {
                html += '<th>' + this._renameColumns(dataTable.columns[i]) + '</th>';
            };
            html += '</tr>';
            return html;
        };
        this.getHTMLData = function (dataTable){
            "use strict";
            let html = "";
            for (let i = 0 ; i < dataTable.data.length; i++){
                html += '<tr>';
                for (let ii = 0; ii < dataTable.columns.length; ii++) {
                    html +=  '<td>' + dataTable.data[i][dataTable.columns[ii]] + '</td>';
                }
                html += '</tr>';
            }
            return html;
        };
    });
})();