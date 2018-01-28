"use strict";
const log     = require('jsfair/log')("liveSearch.js");
const h = require("./db_helper");

const animal  = require('./animal');
const article = require('./article');
const owner   = require('./owner');

module.exports = {
    all: function(query = "*") {
        let dbResults = {};

        dbResults.animals  = animal.get.all(query, true);
        dbResults.articles = article.get.all(query, true);
        dbResults.owner    = owner.get.all(query, true);

        return dbResults;
    },
    short: function(query) {
        let db_res = this.all(query);
        let dbResults = {};

        dbResults.animals = {};
        dbResults.animals.alive = h.limitResults(db_res.animals.alive, 6);
        dbResults.animals.dead  = h.limitResults(db_res.animals.dead, 3);
        dbResults.articles      = h.limitResults(db_res.articles);
        dbResults.owner         = h.limitResults(db_res.owner);

        return dbResults;
    }
};