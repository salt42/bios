"use strict";

const log      = require("jsfair/log");
const DB      = require("jsfair/database");
const h       = require("./db_helper");
const convert = require("./dbObjectConverter");

const sqlFile  = "animals";
const dataType = "animal";


function createAnimalResult (all){
    let result = {};
    result.alive = h.sortOutDeadAnimals(all);
    result.dead  = h.sortOutDeadAnimals(all, true);
    return result;
}

module.exports = {
    get: {
        all:    function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [0]) )[0];
            if (!plainDB) convert.fromDB( dataType, res );
            return createAnimalResult(res);
        },
        byID:   function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [1]) )[0];
            if (!plainDB) convert.fromDB( dataType, res );
            return createAnimalResult(res);
        },
        byName: function (query, plainDB = false){
            let res = h.cleanUpDoubleEntries (DB.runStatement( sqlFile, {query: query}, [2]) )[0];
            if (!plainDB) convert.fromDB( dataType, res );
            return createAnimalResult(res);
        },
    }
};