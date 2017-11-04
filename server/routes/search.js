/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('../database');
var express = require('express');
var router = express.Router();
let func = {};


/* GET home page. */
router.get('/all/:query', function(req, res) {
    let dbResults = {};

    dbResults.owner = DB.liveSearchOwner(req.params.query);
    dbResults.animals = {};
    dbResults.animals.all = DB.liveSearchAnimal(req.params.query);
    dbResults.animals.alive = DB.sortOutDeadAnimals(dbResults.animals.all);
    dbResults.animals.dead = DB.sortOutDeadAnimals(dbResults.animals.all, true);
    dbResults.articles = DB.liveSearchArticle(req.params.query);

    let result = {
        query: req.params.query,
        owners: func.limitResults(dbResults.owner),
        animals: func.limitResults(dbResults.animals.alive),
        deadAnimals: func.limitResults(dbResults.animals.dead),
        articles: func.limitResults(dbResults.articles),
    };


    res.json(result);
});
router.get('/user', function(req, res) {
    let userList = DB.getEmployesList();
    let userListActive = [];
    let userListInactive = [];

    for(let i = 0; i < userList.length; i++){
        if (userList[i].present == 0){
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
router.get('/species/:query', function(req, res) {
    let result = {};
    if (req.params.query == "all"){
        result.list = DB.getSpeciesList();
    }
    else {
    }

    res.json(result);
});
module.exports = router;


/**
 *  Limit results
 * @param   {Object|Array}  data        - db result rows or array
 * @param   {int}           [limit = 5]
 * @returns {Array}
 */
func.limitResults = function (data, limit = 5) {
    let limitedResults = [];
    for (let i = 0; i < limit; i++){
        if (i in data){
            limitedResults.push(data[i]);
        }
    }
    return limitedResults;
};
