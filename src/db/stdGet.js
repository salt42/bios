"use strict";
const DB      = require("jsfair/database");
const convert = require("./dbObjectConverter");
const ERROR   = require("./dbError");

function execStatement(sqlFile, query, statementID_Array, dataType, errorId = 2){
    let rows = DB.runStatement(sqlFile, {query: query}, statementID_Array);
    return (rows.length < 1) ? convert.multi.fromDB(dataType, rows) : ERROR(errorId);
}

module.exports = {
    all: function(sqlFile, dataType) {
            return function (query) {
                return execStatement(sqlFile, query, [0], dataType);
            }
    },
    byID: function(sqlFile, dataType) {
        return function (query) {
            return execStatement(sqlFile, query, [1], dataType, 3);
        }
    },
    byName: function(sqlFile, dataType) {
        return function (query) {
            return execStatement(sqlFile, query, [2], dataType);
        }
    },
};