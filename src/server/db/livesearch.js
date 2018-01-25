"use strict";

const h = require("./helper");
// const DB = require("jsfair/database");
// const convert = require("./dbObjectConverter");
// const error = require("./dbError");

const animal     = require('./../db/animal');
const article    = require('./../db/article');
const owner      = require('./../db/owner');

function errorHandling(errorObject, information = null) {
    console.log("Error in 'src/server/db/livesearch.js'");
    let msg = (information !== null) ? "info:" + information + " -> " : "";
    console.log(msg, errorObject);
    return [];
}

module.exports = {
    all: function(query = null) {
        let dbResults = {};

        let animals  = (query === null) ? animal.get.all()  : animal.get.byName(query);
        let articles = (query === null) ? article.get.all() : article.get.byName(query);
        let owners   = (query === null) ? owner.get.all()   : owner.get.byName(query);

        dbResults.animals = {};
        dbResults.animals.alive = (animals.error) ? errorHandling(animals,  "animals req alive") : h.sortOutDeadAnimals(animals);
        dbResults.animals.dead  = (animals.error) ? errorHandling(animals,  "animals req dead")  : h.sortOutDeadAnimals(animals, true);
        dbResults.articles      = (articles.error)? errorHandling(articles, "articles req")      : articles;
        dbResults.owner         = (owners.error)  ? errorHandling(owners,   "owners req")        : owners;

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