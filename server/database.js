/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var log = require('./log')("Database");
var fs = require('fs');
var Database = require('better-sqlite3');
var config = require('./config');
console.log(__dirname + config.dbFile);
var DB = new Database(__dirname + config.dbFile, {});

module.exports = {
    // live search
    liveSearchOwner(query){
        return this.searchOwnersWith(query);
    },
    liveSearchAnimal(query){
        return this.searchAnimalsWith(query);
        },
    liveSearchArticle(query){
        let row = DB.prepare('select * from articles where (name || vendor) like @query').all({
            query: "%"+query+"%"
        });
        return row;
        },
    // details search
    searchOwnersWith(query) {
        let row = DB.prepare('select * from owner where (name || address || owner_id) like @query').all({
            query: "%"+query+"%"
        });
        return row;
    },
    searchAnimalsWith(query){
        let row = DB.prepare('select * from animal where (name || birthday) like @query').all({
            query: "%"+query+"%"
        });
        return row;
    },
    searchArticlesWith(query){
        let row = DB.prepare('select * from articles where (name || birthday) like @query').all({
            query: "%"+query+"%"
        });
        return row;
    },

    sortOutDeadAnimals(result, invert = false){
        let died_animals = [];
        let alive_animals = [];
        for (let i = 0; i< result.length; i++){
            if (result[i].died == 1 || result[i].died == "True"){
                died_animals.push(result[i]);
            }
            else {
                alive_animals.push(result[i]);
            }
        }
        if (invert == true) return died_animals ;
        else return alive_animals;
    },

    getIcons(select){
        let row = DB.prepare('select * from icons_hash where (type) like @query').all({
            query: select
        });
        return row;
    },




/*
    getOwner(NameOrID) {
        if (typeof NameOrID === "string" && !parseInt(NameOrID)) {
            //string
            console.log('string');
            this.getOwnerByName(NameOrID);
        } else {
            //int
            console.log('int');
            this.getOwnerByName(NameOrID);
        }
        return NameOrID;
    },
    getOwnerById(id) {},
    getOwnerByName(name) {
        //can be first or last name
    },
    getOwnerByAnimalId(id) {},

    getAnimal(NameOrID) {
        if (typeof NameOrID === "string" && !parseInt(NameOrID)) {
            //string
            console.log('string');
            this.getAnimalByName(NameOrID);
        } else {
            //int
            console.log('int');
            this.getAnimalById(NameOrID);
        }
        return NameOrID;
    },
    getAnimalById(id) {
        var row = DB.prepare('SELECT * FROM T_HonorarNotenDetails WHERE "Rechnung-Nr"=?').get(id);

        console.log(row);
        return row;
    },
    getAnimalByName(name) {},
    getAnimalByDiagnosis(diagnosis) {},
    getAnimalByTreatment(treatment) {},

    getArticles(string = null) {
        if (string == null){
            // get all
        } else {
            //get if contains string
        }
    },

    getTreatments(string = null) {
        if (string == null){
            // get all
        } else {
            //get by GOT int
            //get if contains string
        }
    },
    getTreatmentByGOT(gotNr) {},
    getTreatmentByName(string) {},

*/
};

function exitHandler(options, err) {
    console.log("close");
    DB.close();
    // process.exit();
}
//do something when app is closing
process.on('exit', exitHandler);
//catches ctrl+c event
process.on('SIGINT', exitHandler);
//catches uncaught exceptions
process.on('uncaughtException', exitHandler);