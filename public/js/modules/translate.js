define("trans", function(bios){
    "use strict";

    let transStrings = window.trans;
    let speciesList = null;

    if (speciesList === null){
        bios.search.getSpecies("all", function(data){
            setSpeciesList(data.list);
        });
    }

    this.language = function(str) {
        if (str in transStrings)
            str = transStrings[str];
        return str;
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

    function setSpeciesList(list){
        speciesList = [];
        for (let i = 0; i < list.length; i++){
            speciesList[list[i]["id"]] = list[i]["name"];
        }
    }

    this.denumSpecies = function(value){
        return this.denum(speciesList, value);
    }
    this.denum = function (list, value){
            return list[value]
        }

    window.trans = this.language;
});