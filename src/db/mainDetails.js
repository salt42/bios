"use strict";
const log     = require("jsfair/log")("db-mainDetails.js");

const weight    = require("./weight");
const treatment = require("./treatment");
const animOwner = require("./animalOwner");

let emptyWeight = {
    type: "weight",
    id: 0,
    animal_id: 0,
    treatment: null,
    weight: 0.00,
    comment: ""
};
let emptyTreatment = {
    type: "treatment",
    id: 0,
    animal_id: 0,
    treatment: null,
    weight: 0.00,
    comment: ""
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
    let result = getData(searchedByType, query, allOwnerIDs, allAnimalsIDs);
    result = makeUpData(result);
    return result;
}

function getData(queryType, query, allOwnerIDs, allAnimalsIDs){
    let obj = [];
    for (let i = 0; i < allOwnerIDs.length; i++) {
        let ownerData = animOwner.get.detailsOf.owner(allOwnerIDs[i]);
        ownerData.type = "owner";
        ownerData.selected = (queryType === "owner" && query === allOwnerIDs[i]);
        obj.push( ownerData );
    }
    for (let i = 0; i < allAnimalsIDs.length; i++) {
        allAnimalsIDs[i] = parseInt(allAnimalsIDs[i]);
        query = parseInt(query);
        let animalData = animOwner.get.detailsOf.animal(allAnimalsIDs[i]);
        animalData.type = "animal";
        animalData.selected = (queryType === "animal" && query === allAnimalsIDs[i]);
        animalData.weight = weight.get.lastWeigth(allAnimalsIDs[i]);
        animalData.treatments = treatment.get.allTreatments(allAnimalsIDs[i]);
        for (let i = 0; i < animalData.treatments.length; i++) {
            animalData.treatments[i].type = "treatment";
        }
        obj.push( animalData );
    }
    return obj;
}

function makeUpData(resultObjects) {
    for (let i = 0; i < resultObjects.length; i++) {
      let obj = resultObjects[i];
      switch(obj.type){
          case 'owner':
              resultObjects[i].name = obj.first_name + " " + obj.name;
              resultObjects[i].typeOf = obj.gender;
              resultObjects[i].state = null;
              break;
          case 'animal':
              // weight
              if (obj.weight === null){
                  resultObjects[i].weight = emptyWeight;
                  resultObjects[i].weight.animal_id = obj.id;
              }
              // treatment
              if (obj.treatments.length < 1){
                  resultObjects[i].treatments.push(emptyTreatment);
                  resultObjects[i].treatments[0].animal_id = obj.id;
              }
              resultObjects[i].typeOf = obj.species_id;
              resultObjects[i].state = obj.died;
              break;
          default:
      }
    }
    return resultObjects;
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