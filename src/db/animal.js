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
    console.log('here');
    debugger;
    let result = {};
    result.animals = {};
    result.animals.alive = h.sortOutDeadAnimals(all);
    result.animals.dead  = h.sortOutDeadAnimals(all, true);
    return result;
}

module.exports = {
    get: {
        all:    function (query){
            let aa = stdGet.all (sqlFile)(query)[0];
            return convert.multi.fromDB( dataType, createAnimalResult( aa ));
        },
        byID:   stdGet.byID  (sqlFile, dataType),
        byName: function (query){
            return convert.multi.fromDB( dataType, createAnimalResult( stdGet.byName (sqlFile)(query)[0] ) );
        },
    }
};