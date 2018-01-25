module.exports = {
    cleanUpDoubleEntries: function(results){
    let ids = [],
        result = [];
    for (let i = 0; i < results.length; i++){
        if (results[i].id in ids) continue;
        ids[results[i].id] = results[i].id;
        result.push(results[i]);
    }
    return result;
    },

    cleanUpDoubleEntriesMulti: function(results){
    for ( let i = 0; i < results.length; i++){
        results[i] = cleanUpDoubleEntries(results[i]);
    }
    return results;
    },

    sortOutDeadAnimals: function(result, limit = 0, invert = false){
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
    let limitedResults = [];
    if (results.length < count) count = results.length;
    for (let i = 0; i < count; i++){
        limitedResults[i] = results[i];
    }
    return limitedResults;
}
};