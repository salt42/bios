"use strict";
const log     = require("jsfair/log")("db-animal-owner");
const DB      = require("jsfair/database");

const sqlFile = "animalOwner";

let cleanUpBy = {
    animal: function (dbResult){
        let result = [];
        for (let i = 0; i < dbResult.length; i++) {
            result.push(dbResult[i].owner);
        }
        return result;
    },
    owner: function (dbResult){
        let result = [];
        for (let i = 0; i < dbResult.length; i++) {
            result.push(dbResult[i].animal);
        }
        return result;
    },
};

function getData(type, query){
    if(type === "animal") return DB.runStatement(sqlFile, {query: query}, [1]) [0];
    return DB.runStatement(sqlFile, {query: query}, [0]) [0];
}

module.exports = {
    get: {
        idsBy: {
            owner: function (query) {
                if (Array.isArray(query)) {
                    let result = [];
                    for (let i = 0; i < query.length; i++) {
                        result = result.concat(getData("owner", query[i]))
                    }
                    return cleanUpBy.owner(result);

                } else {
                    return cleanUpBy.owner(getData("owner", query));
                }
            },
            animal: function (query) {
                if (Array.isArray(query)) {
                    let result = [];
                    for (let i = 0; i < query.length; i++) {
                        result = result.concat(getData("animal", query[i]))
                    }
                    return cleanUpBy.animal(result);

                } else {
                    return cleanUpBy.animal(getData("animal", query));
                }
            },
        },
        detailsOf: {
            owner: function (ownerID) {
                return DB.runStatement(sqlFile, {query: ownerID}, [2]) [0][0];
            },
            animal: function (animalID) {
                return DB.runStatement(sqlFile, {query: animalID}, [3]) [0][0];
            },
        },
    }
};