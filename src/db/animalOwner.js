"use strict";
const log     = require("jsfair/log")("db-animal-owner");
const DB      = require("jsfair/database");

const sqlFile = "animalOwner";

function createResult(type, dbResult){
    let result = [];
    let doubles = {};
    for (let i = 0; i < dbResult.length; i++){
        if(!doubles[dbResult[i][type]]){
            doubles[dbResult[i][type]] = true;
            result.push(dbResult[i][type]);
        }
    }
    return result;
}

module.exports = {
    get: {
        animalByOwner:    function (query, plainDB = false){
            let dbRes = DB.runStatement( sqlFile, {query: query}, [1]) [0];
            return createResult("animal", dbRes);
        },
        ownerByAnimal:   function (query, plainDB = false){
            let dbRes = DB.runStatement( sqlFile, {query: query}, [0]) [0];
            return createResult("owner", dbRes);
        },
        // byTreatment: function (query, plainDB = false){ },
    }
};