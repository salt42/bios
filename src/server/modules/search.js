/**
 * Created by salt on 28.10.2017.
 */
"use strict";
let DB = require("jsfair/database");

hookIn.createRoute("/search", function(router) {
    router.get('/all/:query', function(req, res) {
        let dbResults = DB.liveSearchAll(req.params.query);

        let result = {
            query: req.params.query,
            owners: dbResults.owner,
            animals: dbResults.animals.alive,
            deadAnimals: dbResults.animals.dead,
            articles: dbResults.articles,
        };


        res.json(result);
    });
    router.get('/user', function(req, res) {
        let userList = DB.getUserList();
        let userListActive = [];
        let userListInactive = [];

        for(let i = 0; i < userList.length; i++){
            if (userList[i].present === 0){
                userListInactive.push(userList[i]);
            } else {
                userListActive.push(userList[i]);
            }
        }

        let result = {
            query: req.params.query,
            users: userList,
            usersActive: userListActive,
            usersInactive: userListInactive,
        };

        res.json(result);
    });
    router.get('/list/:query', function(req, res) {
        let result = {};
        if (req.params.query === "species"){
            result.list = DB.getSpeciesList();
        }
        if(req.params.query === "userRoles"){
            result.list = DB.getUserRolesList();
        }
        else {
            result = DB.getAllLists();
        }

        res.json(result);
    });
    router.get('/owners/:query', function(req, res) {
        let result = DB.searchOwners(req.params.query);

        res.json(result);
    });
    router.get('/owner/:query', function(req, res) {
        let result = DB.searchOwnerByID(req.params.query);

        res.json(result);
    });
    router.get('/animals/:query', function(req, res) {
        let result = DB.searchAnimals(req.params.query);

        res.json(result);
    });
    router.get('/animal/:query', function(req, res) {
        let result = DB.searchAnimalByID(req.params.query);

        res.json(result);
    });
});

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
hookIn.db_addMethod("liveSearchAll", function(DB) {
    return function(query) {

        // firstStart();
        let readOut = cleanUpDoubleEntriesMulti(DB.runStatement("liveSearch", {
            query: query,
        }));
        let dbResults = {};
        let animals = readOut[1];

        dbResults.owner = this.limitLiveSearch(readOut[0]);
        dbResults.animals = {};
        dbResults.animals.alive = this.sortOutDeadAnimals(animals, 6);
        dbResults.animals.dead  = this.sortOutDeadAnimals(animals, 3, true);
        dbResults.articles = this.limitLiveSearch(readOut[2]);

        return dbResults;
    };
});
hookIn.db_addMethod("getList", function(DB) {
    return function(table) {
        return DB.prepare('select * from ' + table).all();
    };
});
hookIn.db_addMethod("getUserList", function(DB) {
    return function() {
        return this.getList("user");
    };
});
hookIn.db_addMethod("getAllLists", function(DB) {
    return function() {
        let result = {};
        result.listSpecies = this.getList("species");
        result.listUserRoles = this.getList("user_roles");
        result.users = this.getList("user");
        return result;
    };
});


/**
 *  Limit results
 * @param   {Object|Array}  data        - db result rows or array
 * @param   {int}           [limit = 5]
 * @returns {Array}
 */
// func.limitResults = function (data, limit = 5) {
//     let limitedResults = [];
//     for (let i = 0; i < limit; i++){
//         if (i in data){
//             limitedResults.push(data[i]);
//         }
//     }
//     return limitedResults;
// };
