"use strict";
const log     = require("jsfair/log")("db_helper");

/* region clean up double entries */
function cudeObjectsArray (arrayOfObjects){
    if ( arrayOfObjects.length < 1) return []; // if array is empty
    let result = [];
    let ids =[];
    for (let i = 0; i < arrayOfObjects.length; i++) {
        if (ids[arrayOfObjects[i].id]) continue;
        ids[arrayOfObjects[i].id] = true;
        result.push(arrayOfObjects[i]);
    }
    return result;
}

function cudeArrayRecursive (array) {
    let result = [];
    if (array.length < 1) return result;
    for (let i = 0; i < array.length; i++){
        if (!Array.isArray(array[i])) result = cudeObjectsArray(array);
        if (Array.isArray(array[i]) && !Array.isEmpty(array[i])){
            result[i] = cudeArrayRecursive(array[i]);
        }
    }
    return result;
}
/*endregion*/

let db_helper = {
    cleanUpDoubleEntries: cudeArrayRecursive,
    sortOutDeadAnimals: function(result, limit = 0, invert = false){
        if (result === null) return null;
        if (typeof limit === "boolean"){
            invert = limit;
            limit = 0;
        }
        let count = 0;
        let res = [];

        for (let i = 0; i < result.length; i++){
            if (invert === true){
                // dead animals
                if (result[i].died === 1 ){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
            else {
                if (!(result[i].died === 1 )){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
        }
        return res;
    },
    limitResults: function(results, limit = 8){
        if (!results) return [];
        if (results.length < limit) limit = results.length;
        if (limit === 0) return results;
        let limitedResults = [];
        for (let i = 0; i < limit; i++){
            limitedResults[i] = results[i];
        }
        return limitedResults;
    },
};

module.exports = db_helper;