/**
 * Created by salt on 28.10.2017.
 */
"use strict";
let DB = require("jsfair/database");
let log = require("jsfair/log")("bios-search");

hookIn.db_onReady(function() {
    // indexing();
});

function indexing() {
    DB.runStatement("dropLS",{});
    DB.runStatement("virtualTablesLS", {});
}
module.exports = {};
module.exports.indexing = indexing;