/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('jsfair/database');
hookIn.http_createRoute("/pet", function(router) {
    router.get('/:name', function(req, res) {
        var pet = DB.getAnimal.byID(req.params.name);
        res.render('pet', {
            petName: JSON.stringify(pet)
        });
    });
});