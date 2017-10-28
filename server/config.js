/**
 * Created by salt on 20.09.2017.
 */
"use strict";

var fs = require("fs");
var prettyJSON = require('prettyjson');
var confPath = "";
var conf = {};
var defaults = {
    httpPort: 666
};

module.exports = function(path) {
    load(path);
    module.exports = conf;
    return conf;
};

function load(path) {
    confPath = path;
    let content = fs.readFileSync(path);
    content = JSON.parse(content);
    conf = {};
    Object.assign(conf, defaults, content);
}
function save() {
    if (!fs.existsSync(confPath)) {
        console.log("path not exists");
        return;
    }
    fs.writeFileSync(confPath, prettyJSON.render(JSON.stringify(conf), { noColor: true }) );
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