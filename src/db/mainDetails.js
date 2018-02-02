"use strict";
const log     = require("jsfair/log")("db-mainDetails.js");

const animalOwnerDB = require("./animalOwner");

function createResult(type, id, owner, animals, treatment){
    id = parseInt(id);
    let result = [];
    for (let i= 0; i < owner.length; i++){
        owner[i] = parseInt(owner[i]);
        result.push({
            type: "owner",
            id: owner[i],
            selected: (type === "owner" && id === owner[i]),
        });
    }
    for (let i= 0; i < animals.length; i++){
        animals[i] = parseInt(animals[i]);
        result.push({
            type: "animal",
            id: animals[i],
            selected: (type === "animal" && id === animals[i]),
        });
    }
    return result;
}

function getAOIDs(type, query) {
    let ret = [];
    let call = (type === "animal") ? type + "ByOwner" : type + "ByAnimal";

    if (Array.isArray(query)){
        for (let i = 0; i < query.length; i++) {
            ret = ret.concat(animalOwnerDB.get[call](query[i]));
        }
    } else {
        ret = animalOwnerDB.get[call](query)
    }
    return ret;
}

module.exports = {
    get: {
        byOwner:    function (query, plainDB = false){
            let animalIDs = animalOwnerDB.get.animalByOwner(query);

            let ownerIDs = getAOIDs("owner", animalIDs);
            return createResult("owner", query, ownerIDs, animalIDs);
        },
        byAnimal:   function (query, plainDB = false){
            let ownerIDs = animalOwnerDB.get.ownerByAnimal(query);

            let animalIDs = getAOIDs("animal", ownerIDs);

            return createResult("animal", query, ownerIDs, animalIDs);
        },
        // byTreatment: function (query, plainDB = false){ },
    }
};