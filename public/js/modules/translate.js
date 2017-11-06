define("trans", function(bios){
    "use strict";

    let transStrings = window.trans;
    let speciesList;
    let userRolesList;

    bios.search.getList("all", function(data){
        speciesList = setSimpleList(data.listSpecies);
        userRolesList = setSimpleList(data.listUserRoles);
    });

    this.language = function(str) {
        let s = str.toLowerCase();
        if (s in transStrings)
            str = transStrings[s];
        return str;
    };

    this.enum = {
        gender(value){
            return Enum("gender", value);
        },
        userRole(value){
            return Enum("user_role", value);
        },
    };


    function Enum(type, value){
        let sel = type.toUpperCase() + "_";
        if (!transStrings.has( sel + value)) console.error("enums need a translation!");
        return transStrings.get(sel + value);
    }

    // decode holds querys from other tables
    // ich bin jetzt mal was essen k bs
    this.decode = {
        species(value){
            return Decode(speciesList, value);
        },
        userRoles(value){
            return Decode(userRolesList, value);
        },
    };

    function setSimpleList(list){
        let res = [];
        for (let i = 0; i < list.length; i++){
            res[list[i]["id"]] = list[i]["name"];
        }
        return res;
    }

    function Decode(list, value){
            return list[value]
    }

    window.trans = this.language;
});