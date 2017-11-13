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

let errorcodes = [
    'no error',     // 0
    'db not found', // 1
    'id not found', // 2
]

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
        let statement = 'SELECT * FROM owner WHERE id = @query ';

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all({
            query: query
        });
        // @todo error codes
        if (row.length < 1) return {
            error: "id not found",
            code: 2,
        };
        let result = {
            hidden: {},
            person: {},
            address: {},
            contact: {},
            cash: {},
            comments: {},
        };
        let a = row[0];
        for (let column in a){
            if (a.hasOwnProperty(column)){
                switch (column){
                    case 'id':
                        result.hidden.id = a[column];
                        break;
                    case 'salutation':
                        result.person.salutation = a[column];
                        break;
                    case 'first_name':
                        result.person.first_name = a[column];
                        break;
                    case 'name':
                        result.person.name = a[column];
                        break;
                    case 'gender':
                        result.person.gender = a[column];
                        break;
                    case 'first_name_2':
                        result.person.first_name_2 = a[column];
                        break;
                    case 'name_2':
                        result.person.name_2 = a[column];
                        break;
                    case 'address':
                        result.address.address = a[column];
                        break;
                    case 'country':
                        result.address.country = a[column];
                        break;
                    case 'Zip':
                        result.address.Zip = a[column];
                        break;
                    case 'City':
                        result.address.City = a[column];
                        break;
                    case 'address_2':
                        result.address.address_2 = a[column];
                        break;
                    case 'Zip_2':
                        result.address.Zip_2 = a[column];
                        break;
                    case 'City_2':
                        result.address.City_2 = a[column];
                        break;
                    case 'telephone_1':
                        result.contact.telephone_1 = a[column];
                        break;
                    case 'telephone_2':
                        result.contact.telephone_2 = a[column];
                        break;
                    case 'telephone_3':
                        result.contact.telephone_3 = a[column];
                        break;
                    case 'telephone_4':
                        result.contact.telephone_4 = a[column];
                        break;
                    case 'e_mail':
                        result.contact.e_mail = a[column];
                        break;
                    case 'www':
                        result.contact.www = a[column];
                        break;
                    case 'comments':
                        result.comments.comments = a[column];
                        break;
                    case 'cave':
                        result.comments.cave = a[column];
                        break;
                    case 'cave_text':
                        result.comments.cave_text = a[column];
                        break;
                    case 'iban':
                        result.cash.iban = a[column];
                        break;
                    case 'bic':
                        result.cash.bic = a[column];
                        break;
                    case 'debit':
                        result.cash.debit = a[column];
                        break;
                    case 'reminder_1':
                        result.comments.reminder_1 = a[column];
                        break;
                    case 'reminder_2':
                        result.comments.reminder_2 = a[column];
                        break;
                    case 'reminder_3':
                        result.comments.reminder_3 = a[column];
                        break;
                    case 'encashment':
                        result.cash.encashment = a[column];
                        break;
                }
            }
        }
        return result;
    },
    searchAnimals(query){
        //todo rebuild query to get a sorted string
        let where = '(owner_id || ';    // deprecated when owner-animal-hash implemented!!
        let statement =  'SELECT * FROM animal WHERE (' + where + 'species_id || race_id || chip || tattoo || name || birthday || color_description || died_on) like @query ';

        // console.log('####### \n QUERY: ', query);
        // console.log('####### \n STATEMENT: \n', statement);
        let row = DB.prepare(statement).all({
            query: "%"+query+"%"
        });
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
                if (result[i].died === 1 || result[i].died.toLowerCase() === "true"){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
            else {
                if (!(result[i].died === 1 || result[i].died.toLowerCase() === "true")){
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