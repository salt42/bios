"use strict";
const log     = require("jsfair/log")("stdGet - Search");
const DB      = require("jsfair/database");
const ERROR   = require("./dbError");
const h       = require("./db_helper");

module.exports = {
    all: function(sqlFile) {
            return function (query) {
                let aa = DB.runStatement(sqlFile, {query: query}, [0]);
                return h.cleanUpDoubleEntries( aa );
            }
    },
    byID: function(sqlFile) {
            return function (query) {
                return h.cleanUpDoubleEntries( DB.runStatement(sqlFile, {query: query}, [1]) );
            }
    },
    byName: function(sqlFile) {
        return function (query) {
            return h.cleanUpDoubleEntries(DB.runStatement(sqlFile, {query: query}, [2]));
        }
    }
};