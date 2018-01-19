/**
 * Created by salt on 28.10.2017.
 */
"use strict";
let DB = require("jsfair/database");

/* region error codes */
let errorcodes = [
    'no error',     // 0
    'db not found', // 1
    'query not found', // 2
    'id not found', // 3
];
/* endregion */

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
    if (count == 0) return results;
    let limitedResults = [];
    if (results.length < count) count = results.length;
    for (let i = 0; i < count; i++){
        limitedResults[i] = results[i];
    }
    return limitedResults;
}

/* region converter */
let convert = {
    fromDB: function (type, resultData) {
        let ownerSet = {
            hidden: {},
            person: {},
            address: {},
            contact: {},
            cash: {},
            comments: {},
        };
        let animalSet = {
            hidden: {},
            animal: {},
            comments: {},
        };
        let articleSet = {
            hidden: {},
            article: {},
            comments: {},
        };
        let result;
        let a = resultData;
        switch (type){
            case "owner":
                result = ownerSet;
                for (let column in a){
                    if (a.hasOwnProperty(column)){
                        switch (column){
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case 'salutation':
                            case 'first_name':
                            case 'gender':
                            case 'name':
                            case 'first_name_2':
                            case 'name_2':
                                result.person[column] = a[column];
                                break;
                            case 'address':
                            case 'country':
                            case 'Zip':
                            case 'City':
                            case 'address_2':
                            case 'Zip_2':
                            case 'City_2':
                                result.address[column] = a[column];
                                break;
                            case 'telephone_1':
                            case 'telephone_2':
                            case 'telephone_3':
                            case 'telephone_4':
                            case 'e_mail':
                            case 'www':
                                result.contact[column] = a[column];
                                break;
                            case 'comments':
                            case 'cave':
                            case 'cave_text':
                            case 'reminder_1':
                            case 'reminder_2':
                            case 'reminder_3':
                                result.comments[column] = a[column];
                                break;
                            case 'iban':
                            case 'bic':
                            case 'debit':
                            case 'encashment':
                                result.cash[column] = a[column];
                                break;
                        }
                    }
                }
                break;
            case "animal":
                result = animalSet;
                for (let column in a){
                    if (a.hasOwnProperty(column)){
                        switch (column){
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case 'name':
                            case 'gender':
                                result.animal[column] = a[column];
                                break;
                        }
                    }
                }
                break;
            case"article":
                result = articleSet;
                for (let column in a) {
                    if (a.hasOwnProperty(column)) {
                        switch (column) {
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case "name":
                                result.article[column] = a[column];
                                break;
                        }
                    }
                }
                break;
        }
        return result;
    },
    toDB: function (type, object) {
        let ownerDB = {
            id: null,
            salutation: null,
            first_name: null,
            gender: null,
            name: null,
            first_name_2: null,
            name_2: null,
            address: null,
            country: null,
            Zip: null,
            City: null,
            address_2: null,
            Zip_2: null,
            City_2: null,
        };
        let animalDB ={
            id: null,
            name: null,
            gender: null,
        };
        let articleDB = {
            id: null,
            name: null,
        };
        let result;
        switch (type){
            case "owner":
                result = ownerDB;
                break;
            case "animal":
                result = animalDB;
                break;
            case "article":
                result = articleDB;
                break;
        }
        for (let fieldset in object) {
            if (object.hasOwnProperty(fieldset)) {
                for (let column in fieldset){
                    if (fieldset.hasOwnProperty(column)) {
                        result[column] = object[fieldset][column];
                    }
                }
            }
        }
        return result;
    },
    multi: {
        fromDB: function (type, resultSet){
            let count = resultSet.length;
            let i = 0;
            let objects;
            if (count === 0) objects = resultSet;
            while (i < count){
                objects[i] = convert.fromDB(type, resultSet[i]); // usage of convert.fromDB because this references to convert.multi
                i++;
            }
            return objects;
        },
        toDB: function (type, objects){
            let count = objects.length;
            let i = 0;
            let data;
            if (count === 0) data = objects;
            while (i < count){
                data[i] = convert.toDB(type, resultSet[i]); // usage of convert.toDB because this references to convert.multi
                i++;
            }
            return data;
        },
    }
};
/* endregion */

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
        // @todo error codes
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
        // @todo error codes
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
        // @todo error codes
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
        // @todo error codes
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
        // @todo error codes
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
        // @todo error codes
        if (results.length < 1) return {
            error: "query not found",
            code: 2,
        };
        return convert.multi.fromDB("animal", results);
    };
});
/* endregion */