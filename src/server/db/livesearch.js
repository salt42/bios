"use strict";

const h = require("./helper");
// const DB = require("jsfair/database");
// const convert = require("./dbObjectConverter");
// const error = require("./dbError");

const animal     = require('./../db/animal');
const article    = require('./../db/article');
const owner      = require('./../db/owner');

module.exports = {
    all: function(query = null) {
        let dbResults = {};

        let animals  = (query === null) ? animal.get.all()  : animal.get.byName(query);
        let articles = (query === null) ? article.get.all() : article.get.byName(query);
        let owners   = (query === null) ? owner.get.all()   : owner.get.byName(query);

        dbResults.animals = {};
        dbResults.animals.alive = (animals.error) ? [] : h.sortOutDeadAnimals(animals);
        dbResults.animals.dead  = (animals.error) ? [] : h.sortOutDeadAnimals(animals, true);
        dbResults.articles      = (articles.error)? [] : articles;
        dbResults.owner         = (owners.error)  ? [] : owners;

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