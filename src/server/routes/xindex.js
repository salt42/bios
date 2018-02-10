/**
 * Created by salt on 28.10.2017.
 */
"use strict";

hookIn.http_createRoute("/", function(router) {
    router.get('/:dashboard(*)', stdRoute);
});

function stdRoute (req, res) {
    return res.render('index', {
        title: req.params.dashboard,
        layout: 'layout'
    });
}