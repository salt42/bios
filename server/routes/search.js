/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/all/:query', function(req, res) {
    let foundOwners = DB.liveSearchOwner(req.params.query);
    let foundAnimals = DB.liveSearchAnimal(req.params.query);
    let foundAnimalsSorted = {
            alives: DB.sortOutDeadAnimals(foundAnimals),
            dead: DB.sortOutDeadAnimals(foundAnimals, true)
        }
    let foundArticles = DB.liveSearchArticle(req.params.query);

    let result = {
        query: req.params.query,
        owners: foundOwners,
        animals: foundAnimalsSorted.alives,
        deadAnimals: foundAnimalsSorted.dead,
        articles: foundArticles,
    };


    res.json(result);
});
module.exports = router;
