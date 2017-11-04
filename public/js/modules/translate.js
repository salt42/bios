define("trans", function(bios){
    "use strict";

    let transStrings = window.trans;

    this.language = function(str) {

    };

    this.gender = function (value){
        return this.enum("gender", value);
    };

    this.userRole = function (value){
        return this.enum("user_role", value);
    };

    this.enum = function (type, value){
        let sel = type.toUpperCase() + "_";
        if (!transStrings.has( sel + value)) console.error("enums need a translation!");
        return transStrings.get(sel + value);
    };

    window.trans = this.language;
});