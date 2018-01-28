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
    if (isEmptyArray(array)) return result;
    for (let i = 0; i < array.length; i++){
        if (!isArray(array[i])) result[i] = cudeObjectsArray(array);
        if (isArray(array[i]) && !isEmptyArray(array[i])){
            result[i] = cudeArrayRecursive(array[i]);
        }
    }
    return result;
}
/*endregion*/
function isArray (obj){
    return (Array.isArray(obj));
}

function isEmptyArray (obj){
    return (obj.length < 1)
}

let db_helper = {
    cleanUpDoubleEntries: (results)=> {
            return cudeArrayRecursive(results);
        },
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

    limitResults: function(results, count = 8){
        if (count === 0) return results;
        if (!results){
            log.error("!results line 63 @ limitResults");
            return [];
        }
        let limitedResults = [];
        if (results.length < count) count = results.length;
        for (let i = 0; i < count; i++){
            limitedResults[i] = results[i];
        }
        return limitedResults;
    },
};

module.exports = db_helper;