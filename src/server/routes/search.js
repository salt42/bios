"use strict";
let log = require("jsfair/log")("bios-routes/search");

const animal     = require('../../db/animal');
const article    = require('../../db/article');
const list       = require('../../db/list');
const liveSearch = require('../../db/liveSearch');
const owner      = require('../../db/owner');

let result = {};

let liveQuery = {
    isSubRoute: function (query) {
        return (query.substr(0,4) === "all/");
    },
    getSubRouteQuery: function (query) {
        return query.substr(4);
    }
};

let route = {
    animals:  (query)=>{ return animal.get.all(query) },
    animal:   (query)=>{ return animal.get.byID(query) },
    articles: (query)=>{ return article.get.all(query) },
    article:  (query)=>{ return article.get.byID(query) },
    owners:   (query)=>{ return owner.get.all(query) },
    owner:    (query)=>{ return owner.get.byID(query) },
};

hookIn.http_createRoute("/search", function(router) {
    router.get('/:type/:query*?', function(req, res) {
        try {
            let query = req.params.query;
            switch (req.params.type) {
                case "animals":
                case "animal":
                case "articles":
                case "article":
                case "owners":
                case "owner":
                    result = route[req.params.type](query);
                    // und wo steht dann des ergebnis drin oh ha fuck
                    break;
                /* region user */
                case "user":
                    let userList = list.get.user();
                    let userListActive = [];
                    let userListInactive = [];

                    for (let i = 0; i < userList.length; i++) {
                        if (userList[i].present === 0) {
                            userListInactive.push(userList[i]);
                        } else {
                            userListActive.push(userList[i]);
                        }
                    }
                    result = {
                        query: query,
                        users: userList,
                        usersActive: userListActive,
                        usersInactive: userListInactive,
                    };
                    break;
                /*endregion*/
                /* region list */
                case "list":
                    switch (query) {
                        case "species":
                            result.list = list.get.species();
                            break;
                        case "userRoles":
                            result.list = list.get.userRoles();
                            break;

                        case "all":
                            result = list.get.all();
                    }
                    break;
                /*endregion*/
                /* region live search */
                case "live":
                case "all":
                    query = (req.params.type === "all") ? "all/" + query : query; // modify query that route /all/:query is treated like /live/all/:query
                    let dbResults = (liveQuery.isSubRoute(query)) ? liveSearch.all(liveQuery.getSubRouteQuery(query)) : liveSearch.short(query);

                    result = {
                        query: (liveQuery.isSubRoute(query)) ? liveQuery.getSubRouteQuery(query) : query,
                        owners: dbResults.owner,
                        animals: dbResults.animals.alive,
                        deadAnimals: dbResults.animals.dead,
                        articles: dbResults.articles,
                    };
                /*endregion*/
            }
            res.json(result);
        } catch (e){
            console.log(e);
        }
    });
});
