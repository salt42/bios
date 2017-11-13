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
    /*region internVars*/
    _SELECT: 'SELECT ',
    _FROM: ' FROM ',
    _WHERE: ' WHERE ',
    _ORDER: ' ORDER BY ',
    /*endregion*/

    testResults(){
        return this.liveSearchArticle("e");
    },

    /*region liveSearch*/
    liveSearchAll(query){
        let dbResults = {};
        dbResults.animals = {};

        dbResults.owner = this.liveSearchOwner(query);
        dbResults.animals.all = this.liveSearchAnimal(query);
        dbResults.animals.alive = this.sortOutDeadAnimals(dbResults.animals.all, 5);
        dbResults.animals.dead = this.sortOutDeadAnimals(dbResults.animals.all, 3, true);
        dbResults.articles = this.liveSearchArticle(query);

        return dbResults;
    },

    liveSearchOwner(query){
        //todo rebuild query to get a sorted result
        let search = {
            query: "%"+query+"%"
        },
            select = 'owner.id, owner.first_name, owner.first_name_2, owner.name, owner.name_2, owner.address, owner.Zip, ' +
                     'owner.City, owner.address_2, owner.Zip_2, owner.City_2',
            from = 'owner',
            where = '(id || salutation || first_name || name || address || Zip || City || ' +
                    'first_name_2 || name_2 || address_2 || Zip_2 || City_2 || ' +
                    'telephone_1 || telephone_2 || telephone_3 || telephone_4 || e_mail || www)',
            Compare = ' ' + 'like @query',
            orderStr = 'name ASC, \n CASE WHEN name = \''+query+'\' THEN 1 ' +
                              'WHEN name like \''+query+'%\' Then 2 ' +
                              'WHEN name like \'%'+query+'\' Then 3 ' +
                              'WHEN name like \'%'+query+'%\' THEN 4 ' +
                              'WHEN first_name like \'%'+query+'%\' THEN 5 ' +
                              'WHEN name_2 like \'%'+query+'%\' THEN 6 ' +
                              'WHEN first_name_2 like \'%'+query+'%\' THEN 7 ' +
                            'END ASC',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare + this._ORDER + orderStr
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },
    liveSearchAnimal(query){
        let search = {
                query: "%"+query+"%"
            },
            select = 'animal.id, animal.species_id, animal.race_id, animal.name, animal.birthday, animal.gender, animal.color_description, animal.died, animal.died_on',
            from = 'animal',
            where = '(owner_id || ' +    // deprecated when owner-animal-hash implemented!!
                    'species_id || race_id || chip || tattoo || name || birthday || color_description || died_on)',
            Compare = ' ' + 'like @query',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },
    liveSearchArticle(query){
        let search = {
                query: "%"+query+"%"
            },
            select = 'articles.id, articles.article_number, articles.name, articles.got, articles.vendor, articles.article_target',
            from = 'articles',
            where = '(article_number || name || volume || got || vendor || charge_number || invoice_id || tax_rate || ' +
                    'sub_unit_1 || sub_unit_2 || sub_unit_3 || article_target)',
            Compare = ' ' + 'like @query',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },
    /*endregion*/

    /*region getLists*/
    getAllLists(){
        let result = {};
        result.listSpecies = this.getList("species");
        result.listUserRoles = this.getList("user_roles");
        result.users = this.getList("user");
        return result;
    },
    getSpeciesList(){
        return this.getList("species");
    },
    getUserRolesList(){
        return this.getList("user_roles");
    },
    getUserList(){
        return this.getList("user");
    },
    getList(table){
        return DB.prepare('select * from ' + table).all();
    },
    /*endregion*/

    /*region search*/
    searchOwners(query){
        //todo rebuild query to get a sorted string
        let search = {
                query: "%"+query+"%"
            },
            select = '*',
            from = 'owner',
            where = '(id || salutation || first_name || first_name_2 || name || name_2 || address || ' +
                    'Zip || City || address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || ' +
                    'telephone_4 || e_mail || www)',
            Compare = ' ' + 'like @query',
            orderStr = '(case when name = \''+query+'\' then 1 ' +
            'when name like \''+query+'%\' then 2 ' +
            'when name like \'%'+query+'\' then 3 ' +
            'when name like \'%'+query+'%\' then 4 ' +
            'end) ASC',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare + this._ORDER + orderStr
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },
    searchOwnerByID(query){
        let search = {
                query: query
            },
            select = '*',
            from = 'owner',
            where = 'id',
            Compare = ' ' + '= @query',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare
        ;
        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        // @todo error codes
        if (row.length < 1) return {
            error: "id not found",
            code: 1,
        };
        return row[0];
    },
    searchAnimals(query){
        //todo rebuild query to get a sorted string
        let search = {
                query: "%"+query+"%"
            },
            select = '*',
            from = 'animal',
            where = '(owner_id || ' +    // deprecated when owner-animal-hash implemented!!
                    'species_id || race_id || chip || tattoo || name || birthday || color_description || died_on)',
            Compare = ' ' + 'like @query',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },
    searchAnimalByID(query){
        let search = {
                query: query
            },
            select = '*',
            from = 'animal',
            where = 'id',
            Compare = ' ' + '= @query',
            statement = this._SELECT + select + this._FROM + from + this._WHERE + where + Compare
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        // @todo error codes
        if (row.length < 1) return {
            error: "id not found",
            code: 1,
        };
        return row[0];
    },
    /*endregion*/

    /*region helper*/
    // helper
    /**
     * Sorts out the dead animals
     * @param {Object}  result   - db result rows
     * @param {int}     [limit]  - limit number of results
     * @param {boolean} [invert = false] - inverts the result: true for dead animals, false for alive animals
     * @returns {Array}
     */
    sortOutDeadAnimals(result, limit = 0, invert = false){
        if (typeof limit === "boolean"){
            invert = limit;
            limit = 0;
        }
        let count = 0;
        let res = [];

        for (let i = 0; i < result.length; i++){
            if (invert === true){
                // dead animals
                if (result[i].died == 1 || result[i].died == "True"){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
            else {
                if (!(result[i].died == 1 || result[i].died == "True")){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
        }
        return res;
    },
    /*endregion*/

    /*region example*/

    exampleJoin(){
        let testa = "SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate" +
            "FROM Orders" +
            "INNER JOIN colors ON animal.color=color.id"+
            "INNER JOIN species ON animal.species_id=species.id"+
            "INNER JOIN race ON animal.race_id=race.id"
    },
    /*endregion*/
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


/*region textPrepare*/
//================================================= TABLES =============================================================
//======================================================================================================================
/*
// ============================= TABLE `animal`
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



// ============================= TABLE `owner`
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




// ============================= TABLE `articles`
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
 */
/*endregion*/