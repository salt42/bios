"use strict";

const stdGet  = require("./stdGet");
const h       = require("./db_helper");
const log     = require("jsfair/log")("animal - Search");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
const convert = require("./dbObjectConverter");

const sqlFile  = "animals";
const dataType = "animal";


function createAnimalResult (all){
    let result = {};
    result = {};
    result.alive = h.sortOutDeadAnimals(all);
    result.dead  = h.sortOutDeadAnimals(all, true);
    return result;
}

module.exports = {
    get: {
        all:    function (query, plainDB = false){
            if(plainDB) return createAnimalResult( stdGet.all (sqlFile)(query)[0][0]);
            return convert.fromDB( dataType, createAnimalResult( stdGet.all (sqlFile)(query)[0][0] ) );
        },
        byID:   function (query, plainDB = false){
            if(plainDB) return createAnimalResult( stdGet.byID() (sqlFile)(query)[0][0] );
            return convert.fromDB( dataType, createAnimalResult( stdGet.byID() (sqlFile)(query)[0][0] ) );
        },
        byName: function (query, plainDB = false){
            if(plainDB) return createAnimalResult( stdGet.byName (sqlFile)(query)[0][0] );
            return convert.fromDB( dataType, createAnimalResult( stdGet.byName (sqlFile)(query)[0][0] ) );
        },
    }
};