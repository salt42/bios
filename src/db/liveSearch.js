"use strict";

const h = require("./helper");
const DB = require("jsfair/database");
// const convert = require("./dbObjectConverter");
// const error = require("./dbError");

const animal  = require('./animal');
const article = require('./article');
const owner   = require('./owner');
const log     = require('jsfair/log')("Error".red + " in 'src/server/db/liveSearch.js'".green);

function errorHandling(errorObject, information = null) {
    let msg = (information !== null) ? "info:" + information + " -> " : "";
    log(msg, errorObject);
    return [];
}

module.exports = {
    all: function(query = "*") {
        let dbResults = {};
        let results = DB.runStatement("liveSearch", {
            query: query
        });

        dbResults.animals = {};
        dbResults.animals.alive = h.sortOutDeadAnimals(results[0]);
        dbResults.animals.dead  = h.sortOutDeadAnimals(results[0], true);
        dbResults.articles      = results[1];
        dbResults.owner         = results[2];

        return dbResults;
    },
    short: function(query) {

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