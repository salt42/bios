"use strict";

const stdGet  = require("./stdGet");
// const DB      = require("jsfair/database");
// const ERROR   = require("./dbError");
// const h       = require("./helper");
// const convert = require("./dbObjectConverter");

const sqlFile  = "animals";
const dataType = "animal";

module.exports = {
    get: {
        all:    stdGet.all   (sqlFile, dataType),
        byID:   stdGet.byID  (sqlFile, dataType),
        byName: stdGet.byName(sqlFile, dataType),
    }
};