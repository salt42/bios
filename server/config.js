/**
 * Created by salt on 20.09.2017.
 */
"use strict";

let fs = require("fs");
let jsonFile = require('jsonfile');
let confPath = "";
let conf = {};
let defaults = {
    httpPort: 666,
    db: {
        dbFile: "/../db/bios.sqlite3",
        sqlQueryFolder: "./sql/",
        sqlQueryCache: false
    }
};

module.exports = function(path) {
    load(path);
    module.exports = conf;
    return conf;
};

function load(path) {
    confPath = path;
    let content = "";
    if (fs.existsSync(confPath)) {
        content = jsonFile.readFileSync(path);
    }
    conf = {};
    Object.assign(conf, defaults, content);
}
function save() {
    jsonFile.writeFileSync(confPath, conf, {spaces: 2, EOL: '\r\n'});
}

function exitHandler(options, err) {
    save();
    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));