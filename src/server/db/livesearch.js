"use strict";

const DB = require("jsfair/database");
const h = require("./helper");
const convert = require("./dbObjectConverter");
const error = require("./errorCodes");

module.exports = {
    all: function(query) {

        // firstStart();
        let readOut = h.cleanUpDoubleEntriesMulti(DB.runStatement("liveSearch", {
            query: query,
        }));
        let dbResults = {};
        let animals = readOut[1];

        dbResults.animals = {};
        dbResults.animals.alive = h.sortOutDeadAnimals(animals);
        dbResults.animals.dead = h.sortOutDeadAnimals(animals, true);
        dbResults.articles = readOut[2];
        dbResults.owner = readOut[0];

        return dbResults;
    },
    short: function(query) {

        // firstStart();
        let db_res = this.all(query);
        let dbResults = {};

        dbResults.animals.alive = h.limitResults(db_res.animals.alive, 6);
        dbResults.animals.dead  = h.limitResults(db_res.animals.dead, 3);
        dbResults.articles      = h.limitResults(db_res.articles);
        dbResults.owner         = h.limitResults(db_res.owner);

        return dbResults;
    }
};