"use strict";
const log     = require("jsfair/log")("db-mainDetails.js");

const weight    = require("./weight");
const treatment = require("./treatment");
const animOwner = require("./animalOwner");

function resultProto() {
    return {
        owner:  [],
        animal: [],
    }
}

function emptyWeight(animalID) {
    return {
        type: "weight",
        id: 0,
        animal_id: animalID,
        treatment: null,
        weight: "0,00",
        comment: "",
    }
};
function emptyTreatment(animalID) {
    return {
        type: "treatment",
        name: "new customer",
        id: 0,
        animal_id: animalID,
        treatment: null,
    }
};

/* region data prepare */
function removeDoubles(dbResult){
    let result = [];
    let doubles = [];
    for (let i = 0; i < dbResult.length; i++){
        if(!doubles.indexOf(dbResult[i]) > -1){
            doubles.push(dbResult[i]);
            result.push(dbResult[i]);
        }
    }
    return result;
}

function createResult(searchedByType, query, allOwnerIDs, allAnimalsIDs){
    let result = getData(allOwnerIDs, allAnimalsIDs);
    result = makeUpData(searchedByType, query, result);
    return result;
}

function getData(allOwnerIDs, allAnimalsIDs){
    let obj = resultProto();
    for (let i = 0; i < allOwnerIDs.length; i++) {
        let ownerData = animOwner.get.detailsOf.owner(allOwnerIDs[i]);
        obj.owner.push( ownerData );
    }
    for (let i = 0; i < allAnimalsIDs.length; i++) {
        let animalData = animOwner.get.detailsOf.animal(allAnimalsIDs[i]);
        animalData.weight = weight.get.lastWeigth(allAnimalsIDs[i]);
        animalData.treatments = treatment.get.allTreatments(allAnimalsIDs[i]);
        obj.animal.push( animalData );
    }
    return obj;
}

function makeUpData(queryType, query, resultObject) {
    for (let i = 0; i < resultObject.owner.length; i++) {
        // add identifiers
        resultObject.owner[i].id = parseInt(resultObject.owner[i].id);
        query = parseInt(query);
        resultObject.owner[i].type     = "owner";
        resultObject.owner[i].selected = (queryType === "owner" && query === resultObject.owner[i].id);
        resultObject.owner[i].name     = resultObject.owner[i].first_name + " " + resultObject.owner[i].name;
        resultObject.owner[i].typeOf   = resultObject.owner[i].gender;
        resultObject.owner[i].state    = null;
    }
    for (let i = 0; i < resultObject.animal.length; i++) {
        // add identifiers
        resultObject.animal[i].id = parseInt(resultObject.animal[i].id);
        query = parseInt(query);
        resultObject.animal[i].type = "animal";
        resultObject.animal[i].selected = (queryType === "animal" && query === resultObject.animal[i].id);
        // no weight:
        if (resultObject.animal[i].weight === null){
          resultObject.animal[i].weight = emptyWeight(resultObject.animal[i].id);
        }
        // no treatment:
        if (resultObject.animal[i].treatments.length < 1){
          resultObject.animal[i].treatments.push(emptyTreatment(resultObject.animal[i].id));
        }
        for (let i_t = 0; i_t < resultObject.animal[i].treatments.length; i_t++) {
            resultObject.animal[i].treatments[i_t].type = "treatment";
        }
        resultObject.animal[i].typeOf = resultObject.animal[i].species_id;
        resultObject.animal[i].state = resultObject.animal[i].died;
    }
    return resultObject;
}
/*endregion*/

module.exports = {
    getBy: {
        owner: function (query){
            let allAnimalsIDs = removeDoubles(animOwner.get.idsBy.owner(query));
            let allOwnerIDs   = removeDoubles(animOwner.get.idsBy.animal(allAnimalsIDs));
            return createResult("owner", query, allOwnerIDs, allAnimalsIDs);
        },
        animal: function (query){
            let allOwnerIDs   = removeDoubles(animOwner.get.idsBy.animal(query));
            let allAnimalsIDs = removeDoubles(animOwner.get.idsBy.owner(allOwnerIDs));
            return createResult("animal", query, allOwnerIDs, allAnimalsIDs);
        },
    },
};