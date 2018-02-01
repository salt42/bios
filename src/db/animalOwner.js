"use strict";
const log     = require("jsfair/log")("db-animal");
const DB      = require("jsfair/database");
const h       = require("./db_helper");
const convert = require("./dbObjectConverter");

const sqlFile = "animalOwner";

module.exports = {
    get: {
        animalByOwner:    function (query, plainDB = false){
            return DB.runStatement( sqlFile, {query: query}, [0]) [0];
        },
        ownerByAnimal:   function (query, plainDB = false){
            return DB.runStatement( sqlFile, {query: query}, [1]) [0];
        },
        // byTreatment: function (query, plainDB = false){ },
    }
};