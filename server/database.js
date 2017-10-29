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