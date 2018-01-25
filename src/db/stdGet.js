"use strict";
const DB      = require("jsfair/database");
const convert = require("./dbObjectConverter");
const ERROR   = require("./dbError");


module.exports = {
    all: function(tableName, dataType = null) {
        dataType = (dataType === null) ? tableName : dataType;
            return function (query = null) {
                if (query !== null) return convert.multi.fromDB(dataType, this.byName(query));

                let rows = DB.select(
                    'SELECT * FROM ' + tableName
                );
                if (rows.length < 1) return ERROR(2);
                return convert.multi.fromDB(dataType, rows);
            }
    },
    byID: function(tableName, dataType = null) {
        dataType = (dataType === null) ? tableName : dataType;
        return function (queryID) {
            let row = DB.select(
                'SELECT * FROM ' + tableName + ' WHERE id = "' + queryID + '"'
            );
            if (row.length < 1) return ERROR(3);
            return convert.fromDB(dataType, row[0]);
        }
    },
    byName: function(tableName, dataType = null) {
        dataType = (dataType === null) ? tableName : dataType;
        return function (query) {
            let rows = DB.select(
                'SELECT * FROM ' + tableName + ' WHERE name like "' + query + '"'
            );
            if (rows.length < 1) return ERROR(2);
            return convert.multi.fromDB(dataType, rows);
        }
    },
};