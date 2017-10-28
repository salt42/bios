/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var log = require('./log')("Database");
var Database = require('better-sqlite3');
var config = require('./config');
var DB = new Database(config.dbFile, {});



module.exports = {
    getPets() {
        var row = DB.prepare('SELECT * FROM users WHERE id=?').get(1);
        // console.log(row.firstName, row.lastName, row.email);
    },
    getMaster() {},
};