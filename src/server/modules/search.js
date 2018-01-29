"use strict";
let log = require("jsfair/log")("bios-modules/search");
let DB = require("jsfair/database");

hookIn.db_onReady(function() {
    // indexing();
});

function indexing() {
    DB.runStatement("dropLS",{});
    DB.runStatement("virtualTablesLS", {});
}
module.exports = {

};
module.exports.indexing = indexing;
DB.indexing = indexing;