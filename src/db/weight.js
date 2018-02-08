"use strict";
const log     = require("jsfair/log")("db-weight");
const DB      = require("jsfair/database");

const sqlFile = "weight";

let exp = {
    get: {
        weigths: function (query){
            return null;
            let w =  DB.runStatement(sqlFile, {query: query}, [0]) [0];
            if (w.length < 0) return null;
            w.sort(function(a,b){
                return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0));
            });
            return w;
        },
        lastWeigth: function (query){
            let w = exp.get.weigths(query);
            return (w === null) ? null : w[0];
        },
    }
};

module.exports = exp;