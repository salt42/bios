/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/all/:query', function(req, res) {
    // let foundA = DB.getAnimalById(5);
    // console.log(foundA);
    let foundOwners = DB.searchOwner(req.params.query);
    let result = {
        query: req.params.query,
        owners: foundOwners,
        // results: [
        //     {
        //         type: "owner",
        //         name: "Salty Salt",
        //         addr: "Mondweg 3"
        //     },
        //     {
        //         type: "animal",
        //         name: "Tüte"
        //     }
        // ]
    };


    res.json(result);
});
module.exports = router;
