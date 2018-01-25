"use strict";
/* region std objects */
let ownerDBObject   = {
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
};
let animalDBObject  ={
    id: null,
    name: null,
    gender: null,
};
let articleDBObject = {
    id: null,
    name: null,
};

let ownerSet   = {
    hidden: {},
    person: {},
    address: {},
    contact: {},
    cash: {},
    comments: {},
};
let animalSet  = {
    hidden: {},
    animal: {},
    comments: {},
};
let articleSet = {
    hidden: {},
    article: {},
    comments: {},
};
/*endregion*/
/* region convert from DB functions */
function animalDBtoObject(a){
    let result = animalSet;
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
    return result;
}
function articleDBtoObject(a){
    let result = articleSet;
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
    return result;
}
function ownerDBtoObject(a){
    let result = ownerSet;
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
    return result;
}
/*endregion*/
/* region convert to DB function */
function objectToDB(a, defaultObject){
    let result = defaultObject;
    //@todo check --- might not work
    for (let fieldset in a) {
        if (a.hasOwnProperty(fieldset)) {
            for (let column in fieldset){
                if (fieldset.hasOwnProperty(column)) {
                    result[column] = a[fieldset][column];
                }
            }
        }
    }
    return result;
}
/*endregion*/
/* region switch functions */
function fromDB_func (type, resultData) {
    switch (type){
        case "animal":
            return animalDBtoObject(resultData);
        case"article":
            return articleDBtoObject(resultData);
        case "owner":
            return ownerDBtoObject(resultData);
    }
}
function toDB_func (type, object) {
    switch (type){
        case "animal":
            return objectToDB(object, animalDBObject);
        case "article":
            return objectToDB(object, articleDBObject);
        case "owner":
            return objectToDB(object, ownerDBObject);
    }
}
function multiFromDB_func (type, resultSet){
    if (resultSet.length === 0) return [];
    let objects = [];
    for (let row in resultSet){
        if(resultSet.hasOwnProperty(row)){
            objects.push(fromDB_func(type, row));
        }
    }
    return objects;
}
function multiToDB_func (type, objects){
    if (objects.length === 0) return [];
    let data = [];
    for (let row in data){
        if(data.hasOwnProperty(row)){
            data.push(toDB_func(type, row));
        }
    }
    return data;
}
/*endregion*/
/* region db object converter structure */
let dbObjectConverter = {
    fromDB: function (type, resultData) {
        return fromDB_func(type, resultData)
    },
    toDB: function (type, object) {
        return toDB_func(type, object)
    },
    multi: {
        fromDB: function (type, resultSet) {
            return multiFromDB_func(type, resultSet)
        },
        toDB: function (type, objects) {
            return multiToDB_func(type, objects)
        },
    }
};
/*endregion*/
module.exports = dbObjectConverter;