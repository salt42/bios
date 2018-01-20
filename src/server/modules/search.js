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

/* region live search */
hookIn.db_addMethod("liveSearchAll", function(DB) {
    return function(query) {

        // firstStart();
        let readOut = cleanUpDoubleEntriesMulti(DB.runStatement("liveSearch", {
            query: query,
        }));
        let dbResults = {};
        let animals = readOut[1];

        dbResults.animals = {};
        dbResults.animals.alive = sortOutDeadAnimals(animals);
        dbResults.animals.dead  = sortOutDeadAnimals(animals, true);
        dbResults.articles = readOut[2];
        dbResults.owner = readOut[0];

        return dbResults;
    };
});
hookIn.db_addMethod("liveSearch", function(DB) {
    return function(query) {

        // firstStart();
        let db_res = this.liveSearchAll(query);
        let dbResults = {};

        dbResults.animals.alive = limitResults(db_res.animals.alive, 6);
        dbResults.animals.dead  = limitResults(db_res.animals.dead, 3);
        dbResults.articles      = limitResults(db_res.articles);
        dbResults.owner         = limitResults(db_res.owner);

        return dbResults;
    };
});
/* endregion */

/*region lists*/
hookIn.db_addMethod("getList", function(DB) {
    return function(table) {
        return cleanUpDoubleEntries(DB.prepare('select * from ' + table).all());
    };
});
hookIn.db_addMethod("getListUserRoles", function() {
    return function() {
        return this.getList("user_roles");
    };
});
hookIn.db_addMethod("getListSpecies", function() {
    return function() {
        return this.getList("species");
    };
});

hookIn.db_addMethod("getUserList", function() {
    return function() {
        return this.getList("user");
    };
});
hookIn.db_addMethod("getAllLists", function() {
    return function() {
        let result = {};
        result.listSpecies = this.getList("species");
        result.listUserRoles = this.getList("user_roles");
        result.users = this.getList("user");
        return result;
    };
});
/*endregion*/

/* region owner */
hookIn.db_addMethod("getOwnerByID", function (DB) {
    return function (queryID) {
        let statement = 'SELECT * FROM owner WHERE id = @query ';

        let row = DB.prepare(statement).all({
            query: queryID
        });
        if (row.length < 1) return {
            error: "id not found",
            code: 3,
        };
        return convert.fromDB("owner", row[0]);
    };
});
hookIn.db_addMethod("getOwnerByName", function (DB) {
    return function (query) {
        let statement = 'SELECT * FROM owner WHERE name = @query ';

        let results = DB.prepare(statement).all({
            query: query
        });
        if (results.length < 1) return {
            error: "query not found",
            code: 2,
        };
        return convert.multi.fromDB("owner", results);
    };
});
/* endregion */
/* region article */
hookIn.db_addMethod("getArticleByID", function (DB) {
    return function (queryID) {
        let statement = 'SELECT * FROM articles WHERE id = @query ';

        let row = DB.prepare(statement).all({
            query: queryID
        });
        if (row.length < 1) return {
            error: "id not found",
            code: 3,
        };
        return convert.fromDB("article", row[0]);
    };
});
hookIn.db_addMethod("getArticleByName", function (DB) {
    return function (query) {
        let statement = 'SELECT * FROM articles WHERE name = @query ';

        let results = DB.prepare(statement).all({
            query: query
        });
        if (results.length < 1) return {
            error: "query not found",
            code: 2,
        };
        return convert.multi.fromDB("article", results);
    };
});
/* endregion */
/* region animals */
hookIn.db_addMethod("getAnimalByID", function (DB) {
    return function (queryID) {
        let statement = 'SELECT * FROM animal WHERE id = @query ';

        let row = DB.prepare(statement).all({
            query: queryID
        });
        if (row.length < 1) return {
            error: "id not found",
            code: 3,
        };
        return convert.fromDB("animal", row[0]);
    };
});
hookIn.db_addMethod("getAnimalByName", function (DB) {
    return function (query) {
        let statement = 'SELECT * FROM animal WHERE name = @query ';

        let results = DB.prepare(statement).all({
            query: query
        });
        if (results.length < 1) return {
            error: "query not found",
            code: 2,
        };
        return convert.multi.fromDB("animal", results);
    };
});
/* endregion */

/* region objectTest */
// --LIST
// @todo check name! getXxxxs.. the last s is to avoid conflicts with db_addMethod -> getXxxxx
hookIn.db_addObject("getLists", function(DB) {
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
//--OWNER
// @todo check name! getXxxxs.. the last s is to avoid conflicts with db_addMethod -> getXxxxx
hookIn.db_addObject("getOwners", function (DB) {
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

/* router conf.. deprecatet/in folder routes */
// hookIn.createRoute("/search", function(router) {
//     router.get('/all/:query', function(req, res) {
//         let dbResults = DB.liveSearchAll(req.params.query);
//
//         let result = {
//             query: req.params.query,
//             owners: dbResults.owner,
//             animals: dbResults.animals.alive,
//             deadAnimals: dbResults.animals.dead,
//             articles: dbResults.articles,
//         };
//
//
//         res.json(result);
//     });
//     router.get('/user', function(req, res) {
//         let userList = DB.getUserList();
//         let userListActive = [];
//         let userListInactive = [];
//
//         for(let i = 0; i < userList.length; i++){
//             if (userList[i].present === 0){
//                 userListInactive.push(userList[i]);
//             } else {
//                 userListActive.push(userList[i]);
//             }
//         }
//
//         let result = {
//             query: req.params.query,
//             users: userList,
//             usersActive: userListActive,
//             usersInactive: userListInactive,
//         };
//
//         res.json(result);
//     });
//     router.get('/list/:query', function(req, res) {
//         let result = {};
//         if (req.params.query === "species"){
//             result.list = DB.getSpeciesList();
//         }
//         if(req.params.query === "userRoles"){
//             result.list = DB.getUserRolesList();
//         }
//         else {
//             result = DB.getAllLists();
//         }
//
//         res.json(result);
//     });
//     router.get('/owners/:query', function(req, res) {
//         let result = DB.searchOwners(req.params.query);
//
//         res.json(result);
//     });
//     router.get('/owner/:query', function(req, res) {
//         let result = DB.searchOwnerByID(req.params.query);
//
//         res.json(result);
//     });
//     router.get('/animals/:query', function(req, res) {
//         let result = DB.searchAnimals(req.params.query);
//
//         res.json(result);
//     });
//     router.get('/animal/:query', function(req, res) {
//         let result = DB.searchAnimalByID(req.params.query);
//
//         res.json(result);
//     });
// });
