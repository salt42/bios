"use strict";

let errorCodes = [
    'no error',     // 0
    'db not found', // 1
    'query not found', // 2
    'id not found', // 3
];

module.exports = function(errorCode){
    return {
        error: errorCodes[errorCode],
        code: errorCode,
    };
};