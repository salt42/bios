/**
 * Created by salt on 28.10.2017.
 */
"use strict";

// var DB = require('../database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/all/:query', function(req, res) {
    let result = [];


    res.send(JSON.stringify(result));
});
module.exports = router;
