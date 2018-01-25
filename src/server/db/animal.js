"use strict";

const DB = require("jsfair/database");
const h = require("./helper");
const convert = require("./dbObjectConverter");
const error = require("./errorCodes");

module.exports = {
    get: {
        all: function (query) {
            if (query !== null) return convert.multi.fromDB("animal", this.byName(query));
            let statement = 'SELECT * FROM animal';

            let row = DB.prepare(statement).all();
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.multi.fromDB("animal", row[0]);
        },
        byID: function (queryID) {
            let statement = 'SELECT * FROM animal WHERE id = @query ';
            let row = DB.prepare(statement).all({
                query: queryID
            });
            if (row.length < 1) return {
                error: "id not found",
                code: 3,
            };
            return convert.fromDB("animal", row[0]);
        },
        byName: function (query) {
            let statement = 'SELECT * FROM animal WHERE name = @query ';

            let results = DB.prepare(statement).all({
                query: query
            });
            if (results.length < 1) return {
                error: "query not found",
                code: 2,
            };
            return convert.multi.fromDB("animal", results);
        }
    }
};