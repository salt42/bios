/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('jsfair/database');

hookIn.http_createRoute("/search", function(router) {
    /* region live search */
    function liveSearchResults (dbResults){
        return {
            query: req.params.query,
            owners: dbResults.owner,
            animals: dbResults.animals.alive,
            deadAnimals: dbResults.animals.dead,
            articles: dbResults.articles,
        };
    }
    router.get('/live/:query', function(req, res) {
        let dbResults = DB.live(req.params.query);

        res.json(liveSearchResults(dbResults));
    });
    router.get('/live/all/:query', function(req, res) {
        let dbResults = DB.liveSearch.all(req.params.query);

        res.json(liveSearchResults(dbResults));
    });
    router.get('/all/:query', function(req, res) {
        let dbResults = DB.liveSearch.all(req.params.query);

        res.json(liveSearchResults(dbResults));
    });
    /*endregion*/
    /* region list */
    router.get('/list/:query', function(req, res) {
        try{
            let result = {};
            if (req.params.query === "species"){
                result.list = DB.getList.species();
            }
            if(req.params.query === "userRoles"){
                result.list = DB.getList.userRoles();
            }
            else {
                console.log(DB.getList());//des is als funktion gedacht denk ich
                result = DB.getList.all();
            }

            res.json(result);
        } catch (e){
            console.log(e);
        }
    });
    /*endregion*/

    /* region animal */
    router.get('/animals/:query', function(req, res) {
        let result = DB.getAnimal.all(req.params.query);

        res.json(result);
    });
    router.get('/animal/:query', function(req, res) {
        let result = DB.getAnimal.byID(req.params.query);

        res.json(result);
    });
    /*endregion*/
    /* region article */
    router.get('/articles/:query', function(req, res) {
        let result = DB.getAnimal.byName(req.params.query);

        res.json(result);
    });
    router.get('/article/:query', function(req, res) {
        let result = DB.getAnimal.byID(req.params.query);

        res.json(result);
    });
    /*endregion*/
    /* region owner */
    router.get('/owners/:query', function(req, res) {
        let result = DB.getOwner.byName(req.params.query);

        res.json(result);
    });
    router.get('/owner/:query', function(req, res) {
        let result = DB.getOwner.byID(req.params.query);

        res.json(result);
    });
    /*endregion*/
    /* region user */
    router.get('/user', function(req, res) {
        let userList = DB.getList.user();
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
    /*endregion*/
});
