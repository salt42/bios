"use strict";

const stdGet  = require("./stdGet");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
// const h       = require("./db_helper");
const convert = require("./dbObjectConverter");

const sqlFile = "articles";
const dataType = "article";

module.exports = {
    get: {
        all:    function (query, plainDB = false){
            if (plainDB) return stdGet.all (sqlFile)(query)[0][0];
            return convert.fromDB( dataType, stdGet.all (sqlFile)(query)[0][0] );
        },
        byID:   function (query, plainDB = false){
            if (plainDB) return stdGet.byID (sqlFile)(query)[0][0];
            return convert.fromDB( dataType, stdGet.byID (sqlFile)(query)[0][0] );
        },
        byName: function (query, plainDB = false){
            if (plainDB) return stdGet.byName() (sqlFile)(query)[0][0];
            return convert.fromDB( dataType, stdGet.byName (sqlFile)(query)[0][0] );
        },
    }
};