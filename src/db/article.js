"use strict";

const stdGet  = require("./stdGet");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
// const h       = require("./helper");
// const convert = require("./dbObjectConverter");

const tableName = "articles";
const dataType = "article";

module.exports = {
    get: {
        all:    stdGet.all   (tableName, dataType),
        byID:   stdGet.byID  (tableName, dataType),
        byName: stdGet.byName(tableName, dataType),
    }
};