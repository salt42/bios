"use strict";
let log = require("jsfair/log")("db-list");
let DB = require("jsfair/database");

let list = {
    get: {
        all: function () {
            let result = {};
            result.user      = list.get.user();
            result.userRoles = list.get.userRoles();
            result.species   = list.get.species();
            return result;
        },
        user: function () {
            return list.get.single("user")[0];
        },
        userRoles: function () {
            return list.get.single("user_roles")[0];
        },
        species: function () {
            return list.get.single("species")[0];
        },
        single: function (table) {
            return DB.runStatement("lists", {table: table}, [0]);
        },
    }
};

module.exports = list;