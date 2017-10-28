/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var log = require('./log')("Database");
var fs = require('fs');
var Database = require('better-sqlite3');
var config = require('./config');
console.log(__dirname + config.dbFile);
var DB = new Database(__dirname + config.dbFile, {});



module.exports = {
    getOwner(id) {
        return id;
    },
    getOwner(name) {},
    getPets(id) {
        var row = DB.prepare('SELECT * FROM T_HonorarNotenDetails WHERE "Rechnung-Nr"=?').get(id);

        console.log(row);
        return row;
    },
    getMaster() {},
};

function exitHandler(options, err) {
    console.log("close");
    DB.close();
    // process.exit();
}
//do something when app is closing
process.on('exit', exitHandler);
//catches ctrl+c event
process.on('SIGINT', exitHandler);
//catches uncaught exceptions
process.on('uncaughtException', exitHandler);