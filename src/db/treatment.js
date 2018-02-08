/**
 * Created by Fry on 08.02.2018.
 */
"use strict";
const log     = require("jsfair/log")("db-treatment");
const DB      = require("jsfair/database");

const sqlFile = "treatment";

function removeDoubles(dbResult){
    let result = [];
    let doubles = {};
    for (let i = 0; i < dbResult.length; i++){
        if(!doubles[dbResult[i].id]){
            doubles[dbResult[i].id] = true;
            result.push(dbResult[i]);
        }
    }
    return result;
}
let exp = {
    get: {
        allTreatments: function (animalId){
            let w =  DB.runStatement(sqlFile, {query: animalId}, [0]) [0];
            if (w.length < 0) return [null];
            w = removeDoubles(w);
            w.sort(function(a,b){
                return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0));
            });
            return w;
        },
        lastTreatment: function (animalId){
            return exp.get.allTreatments(animalId)[0];
        },
        treatment: function (tretamentID) {
            return DB.runStatement(sqlFile, {query: animalId}, [1]) [0];
        }
    }
};

module.exports = exp;