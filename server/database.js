/**
 * Created by salt on 28.10.2017.
 */
"use strict";

let log = require('./log')("Database");
let fs = require('fs');
let Database = require('better-sqlite3');
let config = require('./config');
let liveSearchInitiated = false;

let DB = new Database(__dirname + config.db.dbFile, {});
let sqlQueryRegistry = new Map();

let errorcodes = [
    'no error',     // 0
    'db not found', // 1
    'id not found', // 2
];


function getStatement(name) {
    let query;

    if (!sqlQueryRegistry.has(name)) {
        //load query from file
        let path = config.db.sqlQueryFolder + name + ".sql";
        if (fs.existsSync(path)) {
            query = fs.readFileSync(path).toString();
            if(config.db.sqlQueryCache) {
                sqlQueryRegistry.set(name, query);
            }
            return query;
        } else {
            throw new Error("sql sql file '"+ name +"' not found!");
        }
    } else {
        return sqlQueryRegistry.get(name);
    }
}
function runStatement(name, opt = {}) {
    let statements = getStatement(name);
    let parts = statements.split("--#");
    let result = [];
    for(let i = 0; i < parts.length; i++) {
        if (!parts[i]) continue;

        let func = parts[i].slice(0, parts[i].indexOf("\r\n")),
            statement = parts[i].slice(parts[i].indexOf("\r\n") + 2)
                .replace(/[\n\r]/g, " ")
                .replace(/[\t]/g, " ")
                .trim();

        let stm = DB.prepare(statement);
        let r = stm[func].call(stm, opt);
        result.push(r);
    }
    return result;
}
function firstStart() {
    if (!liveSearchInitiated){
        runStatement("virtualTablesLS");
    }
}
function refreshLiveSearch() {
    if (liveSearchInitiated){
        runStatement("dropLS");
        runStatement("virtualTablesLS");
    }
    else firstStart();
}
function cleanUpDoubleEntries(results){
    let ids = [],
        result = [];
    for (let i = 0; i < results.length; i++){
        if (results[i].id in ids) continue;
        ids[results[i].id] = results[i].id;
        result.push(results[i]);
    }
    return result;
}
function cleanUpDoubleEntriesMulti(results){
    for ( let i = 0; i < results.length; i++){
        results[i] = cleanUpDoubleEntries(results[i]);
    }
    return results;
}
module.exports = {
    /*region internVars*/
    _SELECT: 'SELECT ',
    _FROM: ' FROM ',
    _WHERE: ' WHERE ',
    _ORDER: ' ORDER BY ',
    /*endregion*/

    limitLiveSearch(results, count = 8){
        if (count == 0) return results;
        let resultSet = [];
        if (results.length < count) count = results.length;
        for (let i = 0; i < count; i++){
            resultSet[i] = results[i];
        }
        return resultSet;
    },

    /*region liveSearch*/
    liveSearchAll(query){
        firstStart();
        let readOut = cleanUpDoubleEntriesMulti(runStatement("liveSearch", {
            query: query,
        }));
        let dbResults = {};
        let animals = readOut[1];

        dbResults.owner = this.limitLiveSearch(readOut[0]);
        dbResults.animals = {};
        dbResults.animals.alive = this.sortOutDeadAnimals(animals, 6);
        dbResults.animals.dead  = this.sortOutDeadAnimals(animals, 3, true);
        dbResults.articles = this.limitLiveSearch(readOut[2]);

        return dbResults;
    },

    liveSearchOwner(query){
        //@todo secure searchQuery against sql injection
        refreshLiveSearch();
        return runStatement("liveSearch", {
            query: query,
        })[0];
    },
    liveSearchAnimal(query){
        refreshLiveSearch();
        return runStatement("liveSearch", {
            query: query,
        })[1];
    },
    liveSearchArticle(query){
        refreshLiveSearch();
        return runStatement("liveSearch", {
            query: query,
        })[2];
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
        return this.prepareResults("owner", row[0]);
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

        return this.prepareResults("animal", row[0]);
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
                if (result[i].died === 1 ){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
            else {
                if (!(result[i].died === 1 )){
                    res.push(result[i]);
                    count++;
                    if (count === limit) break;
                }
            }
        }
        return res;
    },

    prepareResults(type, resultData){
        let ownerSet = {
            hidden: {},
            person: {},
            address: {},
            contact: {},
            cash: {},
            comments: {},
        },
            animalSet = {
            hidden: {},
            animal: {},
            comments: {},
        },
            articleSet = {
            hidden: {},
            article: {},
            comments: {},
        };
        let result;
        let a = resultData;
        switch (type){
            case "owner":
                result = ownerSet;
                for (let column in a){
                    if (a.hasOwnProperty(column)){
                        switch (column){
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case 'salutation':
                            case 'first_name':
                            case 'gender':
                            case 'name':
                            case 'first_name_2':
                            case 'name_2':
                                result.person[column] = a[column];
                                break;
                            case 'address':
                            case 'country':
                            case 'Zip':
                            case 'City':
                            case 'address_2':
                            case 'Zip_2':
                            case 'City_2':
                                result.address[column] = a[column];
                                break;
                            case 'telephone_1':
                            case 'telephone_2':
                            case 'telephone_3':
                            case 'telephone_4':
                            case 'e_mail':
                            case 'www':
                                result.contact[column] = a[column];
                                break;
                            case 'comments':
                            case 'cave':
                            case 'cave_text':
                            case 'reminder_1':
                            case 'reminder_2':
                            case 'reminder_3':
                                result.comments[column] = a[column];
                                break;
                            case 'iban':
                            case 'bic':
                            case 'debit':
                            case 'encashment':
                                result.cash[column] = a[column];
                                break;
                        }
                    }
                }
                break;
            case "animal":
                result = animalSet;
                for (let column in a){
                    if (a.hasOwnProperty(column)){
                        switch (column){
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case 'name':
                            case 'gender':
                                result.animal[column] = a[column];
                                break;
                        }
                    }
                }
                break;
            case"article":
                result = articleSet;
                for (let column in a) {
                    if (a.hasOwnProperty(column)) {
                        switch (column) {
                            case 'id':
                                result.hidden[column] = a[column];
                                break;
                            case "name":
                                result.article[column] = a[column];
                                break;
                        }
                    }
                }
                break;
        }
        return result;
    },

    prepareDataForSave(type, data){
        let ownerDB = {
                id: null,
                salutation: null,
                first_name: null,
                gender: null,
                name: null,
                first_name_2: null,
                name_2: null,
                address: null,
                country: null,
                Zip: null,
                City: null,
                address_2: null,
                Zip_2: null,
                City_2: null,
        },
            animalDB ={
                id: null,
                name: null,
                gender: null,
            },
            articleDB = {
                id: null,
                name: null,
            },
            result;
        switch (type){
            case "owner":
                result = ownerDB;
                break;
            case "animal":
                result = animalDB;
                break;
            case "article":
                result = articleDB;
                break;
        }
        for (let fieldset in data) {
            if (data.hasOwnProperty(fieldset)) {
                for (let column in fieldset){
                    if (fieldset.hasOwnProperty(column)) {
                        result[column] = data[fieldset][column];
                    }
                }
            }
        }
        return result;
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