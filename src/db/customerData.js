"use strict";
const log     = require("jsfair/log")("db-customerData.js");

const animalOwner = require("./animalOwner");

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

function createResult(allOwnerIDs, allAnimalsIDs){
    let result = {};
    result.owner  = allOwnerIDs;
    result.animal = allAnimalsIDs;
    return result;
}
/*endregion*/

module.exports = {
    getBy: {
        owner: function (query){
            let allAnimalsIDs = removeDoubles(animalOwner.get.idsBy.owner(query));
            let allOwnerIDs   = removeDoubles(animalOwner.get.idsBy.animal(allAnimalsIDs));
            return createResult(allOwnerIDs, allAnimalsIDs);
        },
        animal: function (query){
            let allOwnerIDs   = removeDoubles(animalOwner.get.idsBy.animal(query));
            let allAnimalsIDs = removeDoubles(animalOwner.get.idsBy.owner(allOwnerIDs));
            return createResult(allOwnerIDs, allAnimalsIDs);
        },
    },
};