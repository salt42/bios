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
    SELECT: 'SELECT ',
    FROM: ' FROM ',
    WHERE: ' WHERE ',
    ORDER: ' ORDER BY ',

    testResults(){
        return this.liveSearchArticle("e");
    },

    // live search
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
        //todo rebuild query to get a sorted string
        let search = {
            query: "%"+query+"%"
        },
            select = 'owner.owner_id, owner.first_name, owner.first_name_2, owner.name, owner.name_2, owner.address, owner.Zip, ' +
                     'owner.City, owner.address_2, owner.Zip_2, owner.City_2',
            from = 'owner',
            where = '(owner_id || salutation || first_name || first_name_2 || name || name_2 || address || Zip || City || ' +
                    'address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || telephone_4 || e_mail || www)',
            Compare = ' ' + 'like @query',
            orderStr = 'name ASC, \n CASE WHEN name = \''+query+'\' THEN 1 ' +
                              'WHEN name like \''+query+'%\' Then 2 ' +
                              'WHEN name like \'%'+query+'\' Then 3 ' +
                              'WHEN name like \'%'+query+'%\' THEN 4 ' +
                              'WHEN first_name like \'%'+query+'%\' THEN 5 ' +
                              'WHEN name_2 like \'%'+query+'%\' THEN 6 ' +
                              'WHEN first_name_2 like \'%'+query+'%\' THEN 7 ' +
                            'END ASC',
            statement = this.SELECT + select + this.FROM + from + this.WHERE + where + Compare + this.ORDER + orderStr
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
            where = '(owner_id || species_id || race_id || chip || tattoo || name || birthday || color_description || died_on)',
            Compare = ' ' + 'like @query',
            statement = this.SELECT + select + this.FROM + from + this.WHERE + where + Compare
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
            where = '(article_number || name || volume || got || vendor || charge_number || invoice_id || tax_rate || sub_unit_1 || sub_unit_2 || sub_unit_3 || article_target)',
            Compare = ' ' + 'like @query',
            statement = this.SELECT + select + this.FROM + from + this.WHERE + where + Compare
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },

    // get lists
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


    searchOwners(query){
        //todo rebuild query to get a sorted string
        let search = {
                query: "%"+query+"%"
            },
            select = '*',
            from = 'owner',
            where = '(owner_id || salutation || first_name || first_name_2 || name || name_2 || address || ' +
                    'Zip || City || address_2 || Zip_2 || City_2 || telephone_1 || telephone_2 || telephone_3 || ' +
                    'telephone_4 || e_mail || www)',
            Compare = ' ' + 'like @query',
            orderStr = '(case when name = \''+query+'\' then 1 ' +
            'when name like \''+query+'%\' then 2 ' +
            'when name like \'%'+query+'\' then 3 ' +
            'when name like \'%'+query+'%\' then 4 ' +
            'end) ASC',
            statement = this.SELECT + select + this.FROM + from + this.WHERE + where + Compare + this.ORDER + orderStr
        ;

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all(search);
        return row;
    },

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

    exampleJoin(){
        let testa = "SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate" +
            "FROM Orders" +
            "INNER JOIN colors ON animal.color=color.id"+
            "INNER JOIN species ON animal.species_id=species.id"+
            "INNER JOIN race ON animal.race_id=race.id"
    },
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


var SQL = {
    create (tablename = null) {
        this._table = "";
        this._selectColumns = "";
        this._where = "";
        this._operator = "";
        this._searchQuery = "";
        this._limit = "";
        this._order = "";
        this._statement = "";
        if (tablename !== null)
            this._table = tablename;
        return this;
    },
    setTable (tablename){
        this._table = tablename;
        this._columns = "";
        return this;
    },
    setSELECTColumns (columns){
        if (this._table === "") console.log("specify table before!!!");
        else if (columns === "" || columns === null) { }
        else if (columns === "*") {
            this._selectColumns = "*";
        }
        else {
            this._selectColumns = columns;
        }
        return this;
    },
    addSELECTColumns (columnName){
        if (this._table === "") console.log("specify table before!!!");
        else if (columnName === "" || columnName === null || columnName === "*") { }
        else if (columnName.indexOf(".") > -1) {
            if (this._selectColumns === "") this._selectColumns = columnName;
            else this._selectColumns += ", " + columnName;
        }
        else {
            if (this._selectColumns === "") this._selectColumns = this._table + "." + columnName;
            else this._selectColumns += ", " + this._table + "." + columnName;
        }
        return this;
    },
    setWHEREColumns (whereColumns) {
        if (this._table === "") console.log("specify table before!!!");
        else if (whereColumns === "" || whereColumns === null) { }
        else if (whereColumns === "*") {
            this._where = "";
        }
        else {
            this._where = whereColumns;
        }
        return this;
    },
    addWHEREColumn (whereColumns) {
        if (this._table === "") console.log("specify table before!!!");
        else if (whereColumns === "" || whereColumns === null || whereColumns === "*") { }
        else {
            if (this._where === "") this._where = whereColumns;
            else this._where += " || " + whereColumns;
        }
        return this;
    },
    setOperator (operator) {
        if (this._table === "") console.log("specify table before!!!");
        else this._operator = operator;
        return this;
    },
    setSearchQuery (query) {
        if (this._table === "") console.log("specify table before!!!");
        else this._searchQuery = query;
        return this;
    },
    setLIMIT (limit) {
        if (this._table === "") console.log("specify table before!!!");
        else this._limit = limit;
        return this;
    },
    setORDERString (orderString) {
        if (this._table === "") console.log("specify table before!!!");
        else {
            if (orderString.toLowerCase().indexOf("order by") > -1)
                this._order = orderString;
            else this._order = 'ORDER BY ' + orderString
        }
        return this;
    },
    getSQLStatement () {
        if ( this._table === "" || (this._where !== "" && this._searchQuery ==="")){
            let msg = "SQLStatement set up is incorrect";
            console.log (msg);
            return msg;
        } // query+ where, table,
        this._statement = "SELECT ";
        this._statement += (this._selectColumns === "") ? "* " : this._selectColumns.trim() + " ";
        this._statement += 'FROM ' + this._table.trim() + " ";
        if (this._where !== ""){
            this._statement += 'WHERE (' + this._where.trim() + ') ';
            this._statement += (this._operator === "")? '= ' : this._operator.trim() + " ";
            if (typeof this._searchQuery === "string") {
                if (this._searchQuery.trim().indexOf("@") > 2) {
                    this._statement += '"' + this._searchQuery.trim() + '" ';
                }
                else {
                    this._statement += this._searchQuery + ' ';
                }
            }
            else {
                this._statement += this._searchQuery + ' ';
            }
            // fix null-in-field-error
            this._statement += 'or (' + this._where.trim() + ') IS NULL ';
            //is null
        }
        this._statement += (this._order === "") ? "" : this._order.trim() + " ";
        this._statement += (this._limit === "") ? "" : "LIMIT " + this._limit + " ";

        return this._statement;
    }
};


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