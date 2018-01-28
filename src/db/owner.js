"use strict";
const log      = require("jsfair/log")("db-owner");
const DB      = require("jsfair/database");
const h       = require("./db_helper");
const convert = require("./dbObjectConverter");

const sqlFile = "owners";
const dataType = "owner";

module.exports = {
    get: {
        all:    function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [0]) [0] );
            return (plainDB) ? res : convert.fromDB( dataType, res );
        },
        byID:   function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [1]) [0] );
            return (plainDB) ? res : convert.fromDB( dataType, res );
        },
        byName: function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [2]) [0] );
            return (plainDB) ? res : convert.fromDB( dataType, res );
        },
    }
};