"use strict";
const log     = require("jsfair/log")("stdGet - Search");
const DB      = require("jsfair/database");
const ERROR   = require("./dbError");
const h       = require("./db_helper");

module.exports = {
    all: function(sqlFile) {
            return function (query) {
                let res = DB.runStatement(sqlFile, {query: query}, [0]);
                return h.cleanUpDoubleEntries( res );
            }
    },
    byID: function(sqlFile) {
            return function (query) {
                let res = DB.runStatement(sqlFile, {query: query}, [1]);
                return h.cleanUpDoubleEntries( res );
            }
    },
    byName: function(sqlFile) {
        return function (query) {
                let res = DB.runStatement(sqlFile, {query: query}, [2]);
                return h.cleanUpDoubleEntries( res );
        }
    }
};