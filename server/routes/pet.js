/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:name', function(req, res) {
    var pet = DB.getPets(req.params.name);
    res.render('pet', {
        petName: JSON.stringify(pet)
    });
});
// router.post('/:name', function(req, res) {
//     var pet = DB.getPets(req.params.name);
//     res.render('pet', {
//         petName: JSON.stringify(pet)
//     });
// });
module.exports = router;
