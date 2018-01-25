"use strict";

const stdGet  = require("./stdGet");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
// const h       = require("./helper");
// const convert = require("./dbObjectConverter");

const tableName = "animal";


module.exports = {
    get: {
        all:    stdGet.all   (tableName),
        byID:   stdGet.byID  (tableName),
        byName: stdGet.byName(tableName),
    }
};