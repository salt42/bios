"use strict";

const stdGet  = require("./stdGet");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
// const h       = require("./db_helper");
// const convert = require("./dbObjectConverter");

const sqlFile = "owners";
const dataType = "owner";

module.exports = {
    get: {
        all:    stdGet.all   (sqlFile, dataType),
        byID:   stdGet.byID  (sqlFile, dataType),
        byName: stdGet.byName(sqlFile, dataType),
    }
};