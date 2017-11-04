/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('../database');
var express = require('express');
var router = express.Router();

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
        owners: DB.limitResults(dbResults.owner),
        animals: DB.limitResults(dbResults.animals.alive),
        deadAnimals: DB.limitResults(dbResults.animals.dead),
        articles: DB.limitResults(dbResults.articles),
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
module.exports = router;
