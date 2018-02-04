"use strict";
const log     = require("jsfair/log")("db-mainDetails.js");

const animalOwnerDB = require("./animalOwner");

function createResult(queryType, queryID, owner, animals, treatment){
    queryID = parseInt(queryID);
    let result = [];
    let obj = {};
    for (let i= 0; i < owner.length; i++){
        let dataID = parseInt(owner[i]);
        obj = {
            type: "owner",
            id: dataID,
            selected: (queryType === "owner" && queryID === dataID),
        };
        obj = patchDetails("owner", obj);
        result.push(obj);
    }
    for (let i= 0; i < animals.length; i++){
        let dataID = parseInt(animals[i]);
        obj = {
            type: "animal",
            id: dataID,
            selected: (queryType === "animal" && queryID === dataID),
        };
        obj = patchDetails("animal", obj);
        result.push(obj);
    }
    return result;
}

function getAOIDs(type, query) {
    let ret = [];
    let call = (type === "animal") ? type + "ByOwner" : type + "ByAnimal";

    if (Array.isArray(query)){
        for (let i = 0; i < query.length; i++) {
            ret = ret.concat(animalOwnerDB.get.idsOf[call](query[i]));
        }
    } else {
        ret = animalOwnerDB.get.idsOf[call](query)
    }
    return ret;
}

function patchDetails(type, obj){
    let res = exp.get.detailsOf[type](obj.id)[0];
    obj.name = "";
    for( let property in res){
        if( res.hasOwnProperty(property)){
            switch(property){
                case 'first_name':
                    obj.name =  res[property] + " " + obj.name;
                    break;
                case 'name':
                    obj.name +=  (isEmpty(res[property])) ? "unknown" : res[property];
                    break;
                case 'died':
                case 'cave':
                    obj.state =  (isEmpty(res[property])) ? 0 : res[property];
                    break;
                case 'species_id':
                case 'gender':
                    obj.typeOf =  (isEmpty(res[property])) ? 0 : res[property];
                    break;
                default:
                    obj[property] = res[property];
            }
        }
    }
    return obj;
}

function isEmpty(value){
    if( !value || value === null || value === "" || value === " ") return true;
    return false;
}

let exp = {
    get: {
        byOwner:    function (query, plainDB = false){
            let animalIDs = animalOwnerDB.get.idsOf.animalByOwner(query);

            let ownerIDs = getAOIDs("owner", animalIDs);
            return createResult("owner", query, ownerIDs, animalIDs);
        },
        byAnimal:   function (query, plainDB = false){
            let ownerIDs = animalOwnerDB.get.idsOf.ownerByAnimal(query);

            let animalIDs = getAOIDs("animal", ownerIDs);

            return createResult("animal", query, ownerIDs, animalIDs);
        },
        // byTreatment: function (query, plainDB = false){ },
        detailsOf: {
            owner: function (query){
                return animalOwnerDB.get.detailsOf.owner(query);
            },
            animal: function (query){
                return animalOwnerDB.get.detailsOf.animal(query);
            }
        },
    }
};

module.exports = exp;