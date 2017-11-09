(function() {

    var listOfAllTables = [];

    defineUI("search", function (bios, $element) {
        "use strict";

        let data = [];
        let list;
        let tableColumns;
        let tableName = $element.attribute('name');

        if (tableName in listOfAllTables) {
            list = listOfAllTables[tableName]["list"];
            data = listOfAllTables[tableName]["data"];
            tableColumns = listOfAllTables[tableName]["tableColumns"];
        } else {
            updateData();
        }
        $element.append(list);

        this.updateData = function () {
            // updatedata;
            // @todo get data by tableName
            tableColumns = dataToTableHeadHTML(data);
            createHTML();
        },
        this.setData = function (data) {
            this.data = data
        },
        this.removeData = function () {
            //
        },
        this.createHTML = function () {
            list = '<table class="display" cellspacing="0" width="100%"><thead>' + tableColumns + '</thead><tbody>';
            list += dataToTableDataHTML(data);
            list += '</tbody><tfoot>' + tableColumns + '</tfoot></table>';

            listOfAllTables[tableName] = [];
            listOfAllTables[tableName]["tableColumns"] = tableColumns;
            listOfAllTables[tableName]["list"] = list;
            listOfAllTables[tableName]["data"] = data;
        }
    },
    function dataToTableDataHTML(data){
        "use strict";
        let tableData = "";
        let columnNames;
        columnNames = dataToColumnNames(data);
        for (let i = 0 ; i < data.length; i++){
            tableData += '<tr>';
            for (let ii = 0; ii < columnNames.length; ii++) {
                tableData +=  '<td>' + data[columnNames[ii]] + '</td>';
            }
            tableData += '</tr>';
        }
        return tableData;
    }

    function dataToColumnNames (data){
        "use strict";
        let names = [];
        data[0].forEach(function (key, value) {
            names.push(key);
        });
        return names;
    }

    function dataToTableHeadHTML (data){
        "use strict";
        let html = "<tr>";
        data[0].forEach(function (key, value) {
            html += '<th>' + key + '</th>';
        });
        html += '</tr>';
        return html;
    }
})();