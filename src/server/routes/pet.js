/**
 * Created by salt on 28.10.2017.
 */
"use strict";

var DB = require('jsfair/database');
hookIn.createRoute("/pet", function(router) {
    router.get('/:name', function(req, res) {
        var pet = DB.getAnimalByID(req.params.name);
        res.render('pet', {
            petName: JSON.stringify(pet)
        });
    });
});