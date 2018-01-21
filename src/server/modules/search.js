/**
 * Created by salt on 28.10.2017.
 */
"use strict";
let DB = require("jsfair/database");
let convert = require("./dbObjectConverter");

/* region error codes */
let errorcodes = [
    'no error',     // 0
    'db not found', // 1
    'query not found', // 2
    'id not found', // 3
];
/* endregion */
/* region helper methods */
function cleanUpDoubleEntries(results){
    let ids = [],
        result = [];
    for (let i = 0; i < results.length; i++){
        if (results[i].id in ids) continue;
        ids[results[i].id] = results[i].id;
        result.push(results[i]);
    }
    return result;
}

function cleanUpDoubleEntriesMulti(results){
    for ( let i = 0; i < results.length; i++){
        results[i] = cleanUpDoubleEntries(results[i]);
    }
    return results;
}

function sortOutDeadAnimals(result, limit = 0, invert = false){
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
}

function limitResults(results, count = 8){
    if (count === 0) return results;
    let limitedResults = [];
    if (results.length < count) count = results.length;
    for (let i = 0; i < count; i++){
        limitedResults[i] = results[i];
    }
    return limitedResults;
}
/*endregion*/

/* region live search */
hookIn.db_addObject("liveSearch", function(DB) {
    return {
        all: function(query) {

            // firstStart();
            let readOut = cleanUpDoubleEntriesMulti(DB.runStatement("liveSearch", {
                query: query,
            }));
            let dbResults = {};
            let animals = readOut[1];

            dbResults.animals = {};
            dbResults.animals.alive = sortOutDeadAnimals(animals);
            dbResults.animals.dead = sortOutDeadAnimals(animals, true);
            dbResults.articles = readOut[2];
            dbResults.owner = readOut[0];

            return dbResults;
        },
        short: function(query) {

            // firstStart();
            let db_res = this.liveSearchAll(query);
            let dbResults = {};

            dbResults.animals.alive = limitResults(db_res.animals.alive, 6);
            dbResults.animals.dead  = limitResults(db_res.animals.dead, 3);
            dbResults.articles      = limitResults(db_res.articles);
            dbResults.owner         = limitResults(db_res.owner);

            return dbResults;
        }
    };
});
// additional short cut
hookIn.db_addMethod("live", function(DB) {
    return function (query) {
        return DB.liveSearch.short(query);
    }
});
/* endregion */

/*region lists*/
hookIn.db_addObject("getList", function(DB) {
    return {
        all: function() {
            let result = {};
            result.user = this.user();
            result.userRoles = this.userRoles();
            result.species   = this.species();
            return result;
        },
        user: function() {
            return this.getList("user");
        },
        userRoles: function() {
            return this.single("user_roles");
        },
        species: function() {
            return this.getList("species");
        },
        single: function (table) {
            return cleanUpDoubleEntries(DB.prepare('select * from ' + table).all());
        },
    };
});
/*endregion*/

/* region animals */
hookIn.db_addObject("getAnimal", function (DB) {
    return {
        all: function (queryID) {
            let statement = 'SELECT * FROM animal WHERE name = @query '; //@todo species = query ... or detail search ??

            let row = DB.prepare(statement).all({
                query: queryID
            });
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.fromDB("animal", row[0]);
        },
        byID: function (queryID) {
            let statement = 'SELECT * FROM animal WHERE id = @query ';

            let row = DB.prepare(statement).all({
                query: queryID
            });
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.fromDB("animal", row[0]);
        },
        byName: function (query) {
            let statement = 'SELECT * FROM animal WHERE name = @query ';

            let results = DB.prepare(statement).all({
                query: query
            });
            if (results.length < 1) return {
                error: "query not found",
                code: 2,
            };
            return convert.multi.fromDB("animal", results);
        }
    }
});
/* endregion */
/* region article */
hookIn.db_addObject("getArticle", function (DB) {
    return {
        byID: function (queryID) {
            let statement = 'SELECT * FROM articles WHERE id = @query ';

            let row = DB.prepare(statement).all({
                query: queryID
            });
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.fromDB("article", row[0]);
        },
        byName: function (query) {
            let statement = 'SELECT * FROM articles WHERE name = @query ';

            let results = DB.prepare(statement).all({
                query: query
            });
            if (results.length < 1) return {
                error: "query not found",
                code: 2,
            };
            return convert.multi.fromDB("article", results);
        },
    }
});
/* endregion */
/* region owner */
hookIn.db_addObject("getOwner", function (DB) {
    return {
        byID: function (queryID) {
            let statement = 'SELECT * FROM owner WHERE id = @query ';

            let row = DB.prepare(statement).all({
                query: queryID
            });
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.fromDB("owner", row[0]);
        },
        byName: function (query) {
            let statement = 'SELECT * FROM owner WHERE name = @query ';

            let results = DB.prepare(statement).all({
                query: query
            });
            if (results.length < 1) return {
                error: "query not found",
                code: 2,
            };
            return convert.multi.fromDB("owner", results);
        },
    };
});
/* endregion */