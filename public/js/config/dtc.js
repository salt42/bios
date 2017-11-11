function dtc() {
    "use strict";

    let helper;
    let listOfAllTables = [];
    let dtc = {
        table: [],
    };

    // default
    let name = "default";
    let constructor = {
        dataTable: {},

        setSettingsFor: function (set){
            this.dataTable = set;
        },

        // DATA
        setData: function (name, data = []) {
            this.dataTable.name = name;
            if (data.isEmpty()){
                if(name in listOfAllTables) this.dataTable = listOfAllTables[name];
                else updateData();
            }
            else {
                this.dataTable.name = name;
                this.dataTable.data = data;
                this.dataTable.allColumns = helper.getAllColumns(this.dataTable.data);
            }
            listOfAllTables[name] = dataTable;
        },

        updateData: function () {
            // updatedata;
            this.dataTable.data = null;  // @todo get data by dataTable.name
            this.dataTable.allColumns = helper.getAllColumns(this.dataTable.data);
            listOfAllTables[this.dataTable.name] = this.dataTable;
        },

        setColumns: function (columns){
            if ((typeof columns === "string") && columns === "all") {
                this.dataTable.columns = this.dataTable.allColumns;
                return;
            }
            if(Array.isArray(columns)) {
                this.dataTable.columns = columns;
                return;
            }
            return; // ERR: no valid "columns"
        },
        addColumns: function (name, columnNumber = null){
            if (!(name in this.dataTable.allColumns)) return; // ERR Column not found
            if (columnNumber === null) {
                this.dataTable.columns.push(name);
            } else {
                this.dataTable.columns = helper.insertInArray(columnNumber, name, this.dataTable.columns);
            }
        },
        removeColumns: function (name) {
            if (typeof name === "string") {
                this.dataTable.columns = helper.spliceArrayByValue(name, this.dataTable.columns);
                return;
            }
            if(Array.isArray(name)) {
                for (let i = 0; i < name.length; i++){
                    this.dataTable.columns = helper.spliceArrayByValue(name[i], this.dataTable.columns);
                }
                return;
            }
            return; // ERR?
        },
        reorderColumn: function (columnName, columnNumber = null){
            this.dataTable.columns = helper.spliceArrayByValue(columnName, this.dataTable.columns);
            this.dataTable.columns = helper.insertInArray(columnNumber, columnName, this.dataTable.columns);
        },
        addButtonInColumns: function (columnName, buttonSetupArray, columnNumber = null){
            if (columnName in this.dataTable.data) columnName += ' Action';
            if (columnNumber === null){
                this.dataTable.columns.push(columnName);
                this.dataTable.data[columnName] = buttonSetupArray;
            }
        }
    }

    let tableSettings = {
        name: name,
        data: null,
        allColumns: [],
        columns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    constructor.setSettingsFor(tableSettings);
    // do stuff
    dtc.table[name] = tableSettings;

    // bla
    name = "bla";
    tableSettings = {
        name: name,
        data: null,
        allColumns: [],
        columns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    constructor.setSettingsFor(tableSettings);
    dtc.table[name] = tableSettings;

    window.dtc = dtc;

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
}
dtc();