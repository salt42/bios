"use strict";
let dbObjectConverter = {
    fromDB: function (type, resultData) {
        let ownerSet = {
            hidden: {},
            person: {},
            address: {},
            contact: {},
            cash: {},
            comments: {},
        };
        let animalSet = {
            hidden: {},
            animal: {},
            comments: {},
        };
        let articleSet = {
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
    toDB: function (type, object) {
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
        };
        let animalDB ={
            id: null,
            name: null,
            gender: null,
        };
        let articleDB = {
            id: null,
            name: null,
        };
        let result;
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
        for (let fieldset in object) {
            if (object.hasOwnProperty(fieldset)) {
                for (let column in fieldset){
                    if (fieldset.hasOwnProperty(column)) {
                        result[column] = object[fieldset][column];
                    }
                }
            }
        }
        return result;
    },
    multi: {
        fromDB: function (type, resultSet){
            let count = resultSet.length;
            let i = 0;
            let objects;
            if (count === 0) objects = resultSet;
            while (i < count){
                objects[i] = dbObjectConverter.fromDB(type, resultSet[i]); // usage of dbObjectConverter.fromDB because this references to convert.multi
                i++;
            }
            return objects;
        },
        toDB: function (type, objects){
            let count = objects.length;
            let i = 0;
            let data;
            if (count === 0) data = objects;
            while (i < count){
                data[i] = convert.toDB(type, resultSet[i]); // usage of convert.toDB because this references to convert.multi
                i++;
            }
            return data;
        },
    }
};

module.exports = dbObjectConverter;
