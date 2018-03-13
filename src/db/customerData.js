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

function createIDObject(allOwnerIDs, allAnimalsIDs){
    let result = {};
    result.owner  = allOwnerIDs;
    result.animal = allAnimalsIDs;
    return result;
}

function getData(idObject) {
    let result = {
        animal: [],
        owner: []
    };
    for (let section in idObject) {
        for (let i = 0; i < idObject[section].length; i++) {
            result[section].push(animalOwner.get.detailsOf[section](idObject[section][i]));
        }
    }
    return result;
}
/*endregion*/

module.exports = {
    getBy: {
        owner: function (query){
            let allAnimalsIDs = removeDoubles(animalOwner.get.idsBy.owner(query));
            let allOwnerIDs   = removeDoubles(animalOwner.get.idsBy.animal(allAnimalsIDs));
            return getData( createIDObject(allOwnerIDs, allAnimalsIDs) );
        },
        animal: function (query){
            let allOwnerIDs   = removeDoubles(animalOwner.get.idsBy.animal(query));
            let allAnimalsIDs = removeDoubles(animalOwner.get.idsBy.owner(allOwnerIDs));
            return getData( createIDObject(allOwnerIDs, allAnimalsIDs) );
        },
    },
};