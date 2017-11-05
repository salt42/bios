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
    testResults(){
        return this.liveSearchArticle("e");
    },

    // live search
    liveSearchOwner(query){
        let select = 'owner.owner_id, owner.first_name, owner.first_name_2, owner.name, owner.name_2, owner.address, owner.Zip, owner.City, owner.address_2, owner.Zip_2, owner.City_2';
        let likes = '(owner_id || salutation || first_name || first_name_2 || name || name_2 || address || Zip || City || address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || telephone_4 || e_mail || www)';
        let orderPrio = ',case when '+likes+' = \''+query+'\' then 1 ' +
                              'when '+likes+' like \''+query+'%\' then 2 ' +
                              'when '+likes+' like \'%'+query+'\' then 3 ' +
                              'when '+likes+' like \'%'+query+'%\' then 4 ' +
                            'end as [priority]';
        let order = 'order by [priority]';
        let row = DB.prepare('select ' + select + orderPrio + ' from owner where  ' + likes + ' like @query or ' + likes + ' is null ' + order).all({
            query: "%"+query+"%"
        });
        console.log(row);
        return row;
    },
    liveSearchAnimal(query){
        let select = 'animal.id, animal.species_id, animal.race_id, animal.name, animal.birthday, animal.gender, animal.color_description, animal.died, animal.died_on';
        let likes = '(owner_id || species_id || race_id || chip || tattoo || name || birthday || color_description || died_on)';
        let row = DB.prepare('select ' + select + ' from animal where ' + likes + ' like @query or ' + likes + ' is null').all({
            query: "%"+query+"%"
        });
        return row;
    },
    liveSearchArticle(query){
        let select = 'articles.id, articles.article_number, articles.name, articles.got, articles.vendor, articles.article_target';
        let likes = '(article_number || name || volume || got || vendor || charge_number || invoice_id || tax_rate || sub_unit_1 || sub_unit_2 || sub_unit_3 || article_target)';
        let row = DB.prepare('select ' + select + ' from articles where ' + likes + ' like @query or ' + likes + ' is null').all({
            query: "%"+query+"%"
    });
        return row;
    },
    // details search
    getAllLists(){
        let result = {};
        result.listSpecies = this.getSpeciesList();
        result.listUserRoles = this.getUserRolesList();
        return result;
    },
    getSpeciesList(){
        let row = DB.prepare('select * from species').all();
        return row;
    },
    getUserRolesList(){
        let row = DB.prepare('select * from user_roles').all();
        return row;
    },
    searchOwnersWith(query) {
        let likes = '(id || owner_id || salutation || first_name || first_name_2 || name || name_2 || address || Zip || City || address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || telephone_4 || e_mail || www)';
        let row = DB.prepare('select * from owner where  '+ likes + ' like @query').all({
            query: "%"+query+"%"
        });
        console.log(row);
        return row;
    },
    searchAnimalsWith(query){
        let likes = '(owner_id || species_id || race_id || chip || tattoo || name || birthday || color_description || died_on)';
        let row = DB.prepare('select * from animal where ' + likes + ' like @query').all({
            query: "%"+query+"%"
        });
        console.log(row);
        return row;
    },
    searchArticlesWith(query){
        let row = DB.prepare('select * from articles where (name || birthday) like @query').all({
            query: "%" + query + "%"
        });
        return row;
    },
    exampleJoin(){
        let testa = "SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate" +
        "FROM Orders" +
        "INNER JOIN colors ON animal.color=color.id"+
        "INNER JOIN species ON animal.species_id=species.id"+
        "INNER JOIN race ON animal.race_id=race.id"
    },
    /**
     * Sorts out the dead animals
     * @param {Object}  result   - db result rows
     * @param {boolean} [invert = false] - inverts the result: true for dead animals, false for alive animals
     * @returns {Array}
     */
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


    // Employes / User
    getEmployesList(){
        let row = DB.prepare('select * from user').all();
        return row;
    }
/*  fields of tables
TABLE `animal` (
`id`	            INTEGER PRIMARY KEY AUTOINCREMENT,.     animal.id
`owner_id`	        INTEGER,                          .     animal.owner_id
`species_id`	    INTEGER,                          .     animal.species_id
`race_id`	        INTEGER,                          .     animal.race_id
`chip`	            TEXT,                             .     animal.chip
`tattoo`	        TEXT,                             .     animal.tattoo
`insurance_number`	TEXT,                             .     animal.insurance_number
`insurance_type`	TEXT,                             .     animal.insurance_type
`name`	            TEXT,                             .     animal.name
`image`	            INTEGER,                          .     animal.image
`image_2`	        INTEGER,                          .     animal.image_2
`castrated`	        TEXT,                             .     animal.castrated
`birthday`	        INTEGER,                          .     animal.birthday
`gender`	        TEXT,                             .     animal.gender
`color_description`	TEXT,                             .     animal.color_description
`cave`	            INTEGER,                          .     animal.cave
`comment`	        TEXT,                             .     animal.comment
`specials`	        TEXT,                             .     animal.specials
`kennels_name`	    TEXT,                             .     animal.kennels_name
`breeding_number`	TEXT,                             .     animal.breeding_number
`died`	            INTEGER,                          .     animal.died
`reminder`	        TEXT,                             .     animal.reminder
`reminder_date`	    INTEGER,                          .     animal.reminder_date
`died_on`	        INTEGER                           .     animal.died_on
);
likes:
owner_id || species_id || race_id || chip || tattoo || name || birthday || color_description || died_on
select:
animal.id, animal.species_id, animal.race_id, animal.name, animal.birthday, animal.gender, animal.color_description, animal.died, animal.died_on


TABLE `owner` (
`id`	        INTEGER PRIMARY KEY AUTOINCREMENT,.     owner.id
`owner_id`	    INTEGER,                          .     owner.owner_id
`salutation`	INTEGER,                          .     owner.salutation
`first_name`	TEXT,                             .     owner.first_name
`name`	        TEXT,                             .     owner.name
`name_2`        TEXT,                             .     owner.name_2
`gender`        TEXT,                             .     owner.gender
`address`       TEXT,                             .     owner.address
`country`       TEXT,                             .     owner.country
`Zip`	        INTEGER,                          .     owner.Zip
`City`	        TEXT,                             .     owner.City
`address_2`	    TEXT,                             .     owner.address_2
`Zip_2`	        INTEGER,                          .     owner.Zip_2
`City_2`	    TEXT,                             .     owner.City_2
`telephone_1`	TEXT,                             .     owner.telephone_1
`telephone_2`	TEXT,                             .     owner.telephone_2
`telephone_3`	TEXT,                             .     owner.telephone_3
`telephone_4`	TEXT,                             .     owner.telephone_4
`e_mail`	    TEXT,                             .     owner.e_mail
`www`	        TEXT,                             .     owner.www
`comments`	    TEXT,                             .     owner.comments
`cave`	        INTEGER,                          .     owner.cave
`cave_text`	    TEXT,                             .     owner.cave_text
`IBAN`  	    TEXT,                             .     owner.IBAN
`BIC`	        TEXT,                             .     owner.BIC
`debit`	        INTEGER,                          .     owner.debit
`reminder_1`	TEXT,                             .     owner.reminder_1
`reminder_2`	TEXT,                             .     owner.reminder_2
`reminder_3`	TEXT,                             .     owner.reminder_3
`inkasso`	    INTEGER)                          .     owner.inkasso
`first_name_2`	TEXT                              .     owner.first_name_2

for live search:
likes
id || owner_id || salutation || first_name || first_name_2 || name || name_2 || address || Zip || City || address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || telephone_4 || e_mail || www

select:
owner.owner_id, owner.first_name, owner.first_name_2, owner.name, owner.name_2, owner.address, owner.Zip, owner.City, owner.address_2, owner.Zip_2, owner.City_2

TABLE `articles` (
`id`	                    INTEGER PRIMARY KEY AUTOINCREMENT, .   articles.id
`article_number`	        INTEGER,                           .   articles.article_number
`name`	                    TEXT,                              .   articles.name
`volume`	                REAL,                              .   articles.volume
`unit`	                    INTEGER,                           .   articles.unit
`got`	                    TEXT,                              .   articles.got
`purchasing_price_net`	    REAL,                              .   articles.purchasing_price_net
`purchasing_price_gross`	REAL,                              .   articles.purchasing_price_gross
`retail_net`	            REAL,                              .   articles.retail_net
`retail_gross`	            REAL,                              .   articles.retail_gross
`vendor`	                TEXT,                              .   articles.vendor
`charge_number`	            TEXT,                              .   articles.charge_number
`invoice_id`	            INTEGER,                           .   articles.invoice_id
`tax_rate`	                REAL,                              .   articles.tax_rate
`pieces`	                REAL,                              .   articles.pieces
`sub_unit_1`	            INTEGER,                           .   articles.sub_unit_1
`sub_unit_1_price`	        REAL,                              .   articles.sub_unit_1_price
`sub_unit_2`	            INTEGER,                           .   articles.sub_unit_2
`sub_unit_2_price`	        REAL,                              .   articles.sub_unit_2_price
`sub_unit_3`	            INTEGER,                           .   articles.sub_unit_3
`sub_unit_3_price`	        REAL,                              .   articles.sub_unit_3_price
`comments`	                TEXT,                              .   articles.comments
`delay_time`	            INTEGER,                           .   articles.delay_time
`stored`	                REAL,                              .   articles.stored
`article_target`	        INTEGER DEFAULT 1                  .   articles.article_target
);
like:
article_number || name || volume || got || vendor || charge_number || invoice_id || tax_rate || sub_unit_1 || sub_unit_2 || sub_unit_3 || article_target

select:
articles.id, articles.article_number, articles.name, articles.got, articles.vendor, articles.article_target

 */


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