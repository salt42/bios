"use strict";

const DB = require("jsfair/database");
const h  = require("./helper");
// const convert = require("./dbObjectConverter");
// const error   = require("./dbError");

module.exports = {
    get: {
        all: function () {
            let result = {};
            result.user = this.user();
            result.userRoles = this.userRoles();
            result.species = this.species();
            return result;
        },
        user: function () {
            return this.single("user");
        },
        userRoles: function () {
            return this.single("user_roles");
        },
        species: function () {
            return this.single("species");
        },
        single: function (table) {
            return h.cleanUpDoubleEntries(DB.runStatement("lists", {table: table})[0]);
        },
    }
};