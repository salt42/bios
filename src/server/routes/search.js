/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('jsfair/database');

hookIn.createRoute("/search", function(router) {
    router.get('/live/:query', function(req, res) {
        let dbResults = DB.liveSearch(req.params.query);

        let result = {
            query: req.params.query,
            owners: dbResults.owner,
            animals: dbResults.animals.alive,
            deadAnimals: dbResults.animals.dead,
            articles: dbResults.articles,
        };

        res.json(result);
    });
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
