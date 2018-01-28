"use strict";

const DB = require("jsfair/database");
const h = require("./db_helper");
// const convert = require("./dbObjectConverter");
// const error = require("./dbError");

const animal  = require('./animal');
const article = require('./article');
const owner   = require('./owner');
const log     = require('jsfair/log')("liveSearch.js");

function errorHandling(errorObject, information = null) {
    let msg = (information !== null) ? "info:" + information + " -> " : "";
    log.error(msg, errorObject);
    return [];
}

module.exports = {
    all: function(query = "*") {
        let dbResults = {};
        let animals = animal.get.all(query, true);

        dbResults.animals  = animals;
        dbResults.articles = article.get.all(query, true);
        dbResults.owner    = owner.get.all(query, true);

        return dbResults;
    },
    short: function(query) {

        debugger;
        // firstStart();
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