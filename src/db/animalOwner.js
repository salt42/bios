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

let exp = {
    get:{
        idsOf:
            {
                animalByOwner:    function (query, plainDB = false) {
                    let dbRes = DB.runStatement(sqlFile, {query: query}, [1]) [0];
                    return createResult("animal", dbRes);
                },
                ownerByAnimal:   function (query, plainDB = false) {
                    let dbRes = DB.runStatement(sqlFile, {query: query}, [0]) [0];
                    return createResult("owner", dbRes);
                },
            },
        // byTreatment: function (query, plainDB = false){ },
        detailsOf: {
            owner: function (query){
                return DB.runStatement( sqlFile, {query: query}, [2]) [0];
            },
            animal: function (query){
                let details = DB.runStatement( sqlFile, {query: query}, [3]) [0];
                let lastWeight = exp.get.lastWeightByAnimalID(query);
                details[0].weight = (lastWeight) ? lastWeight.weight : "0,00";
                return details;
            },
        },
        weightsByAnimalID: function (query){
            let w = DB.runStatement( sqlFile, {query: query}, [4]) [0];
            if(w === [])
            w.sort(function(a,b){
                return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0));
            });
            return w;
        },
        lastWeightByAnimalID: function (query){
            return exp.get.weightsByAnimalID(query)[0];
        },

    }
};

module.exports = exp;