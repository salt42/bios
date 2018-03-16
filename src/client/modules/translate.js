define("trans", function(bios){
    "use strict";

    let self = this;
    let transStrings = window.trans;
    let speciesList;
    let userRolesList;
    let file = _translate("bios_language");
    bios.needTranslation = {};
    let logTriggered = false;


    let error = false;

    /* region get lists */
    bios.search.getList("all", function(data){
        errorCheck("bios.search.getList('all'...", data);
        speciesList   = setSimpleList(data.species);
        userRolesList = setSimpleList(data.userRoles);
    });

    function setSimpleList(list){
        let res = [];
        for (let i = 0; i < list.length; i++){
            res[list[i]["id"]] = list[i]["name"];
        }
        return res;
    }
    /*endregion*/

    /* region get translation */
    this.language = translate;
    this.late = translate;

    function translate (str) {
        logList();
        return _translate(str);
    }
    function _translate (str) {
        let s = str.toLowerCase();
        if (!(!transStrings.get(s)))
            str = transStrings.get(s);
        else bios.needTranslation[str]= str ;
        return str;
    }
    /*endregion*/

    this.age = function (birthday){
        return calculateAge(birthday);
    };
    function calculateAge(birthday){
        let today = new Date();
        let birthdayDate = new Date(birthday);
        if (isNaN(birthday)){
            let date = birthday
                .substr(0,10)
                .split('.');
            birthdayDate = new Date (date[1] + '.' + date[0] + '.' + date[2]);
            if (isNaN(birthdayDate))console.log('still sth wrong', date)
        }
        let age = Math.floor((today-birthdayDate) / (24 * 60 * 60 * 1000))/ 365.25;
        if(isNaN(age)) return '';
        age =  age.toFixed(1).split('.');
        let months = (age[1] === "0") ? "" : ' ' + (age[1] * 12/ 10).toFixed(0) + ' ' + translate('months');
        return age[0] + ' ' + translate('years') + months ;
    }
    function calculateYears(days) {
        let y = 0;
        while (days > 365.25){
            y++;
            days = days - 365.25;
        }
        return {
            years: y,
            rest: days,
        };
    }
    /* region enum */
    this.enum = {
        gender(value){
            return Enum("gender", value);
        },
        userRole(value){
            return Enum("user_role", value);
        },
        species(value){
            return Enum("species", value);
        },
    };
    /*endregion*/

    /* region get enum aux */
    function Enum(type, value){
        let sel = type.toUpperCase() + "_";
        if (!transStrings.has( sel + value)) console.error("enums need a translation!");
        return transStrings.get(sel + value);
    }
    /*endregion*/

    /* region decode */
    // decode holds querys from other tables
    this.decode = {
        species(value){
            return _Decode(speciesList, value);
        },
        userRoles(value){
            return _Decode(userRolesList, value);
        },
    };
    /*endregion*/

    /* region decode aux */

    function _Decode(list, value){
        if(error) return value;
        return translate(list[value])
    }
    /*endregion*/

    window.trans = this.language;

    /* region error handling */
    function errorCheck(funcName, data){
        let eMsg = "";
        switch (funcName){
            case "bios.search.getList('all'...":
                if(!data) eMsg += "couldn't get Lists. ";
                else {
                    if(data.species.length === 0 )   eMsg += ("List 'species' is empty! ");
                    if(data.userRoles.length === 0 ) eMsg += ("List 'userRole' is empty!");
                }
                if(eMsg) {
                    error = true;
                    throw new Error("Language Translation Module ERROR: " + eMsg);
                }
        }
    }
    /* endregion*/

    function logList(){
        if(jQuery.isEmptyObject(bios.needTranslation)) return;
        if(!logTriggered){
            logTriggered = true;
            setTimeout(function(){
                let obj = {
                    language_file: file,
                    phrases: bios.needTranslation,
                };
                console.log('needs translation: ', obj);
                logTriggered = false;
            }, 2000);
        }
    }
    this.log = logList;
});