/**
 * Created by salt on 28.10.2017.
 */
"use strict";

// var DB = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:name', function(req, res) {

    res.render('pet', {
        petName: req.params.name
    });
});
module.exports = router;
