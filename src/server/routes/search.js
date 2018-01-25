/**
 * Created by salt on 28.10.2017.
 */
"use strict";

const animal     = require('./../db/animal');
const article    = require('./../db/article');
const list       = require('./../db/list');
const livesearch = require('./../db/livesearch');
const owner      = require('./../db/owner');
let result = {};

hookIn.http_createRoute("/search", function(router) {
    router.get('/:type/:query*?', function(req, res) {
        try {
            req.params.query = null;
            console.log('gdf', req.params);
            switch (req.params.type) {
                /* region animals */
                case "animals":
                    result = animal.get.all(req.params.query);
                    break;
                case "animal":
                    result = animal.get.byID(req.params.query);
                    break;
                /*endregion*/
                /* region article */
                case "articles":
                    result = article.get.all(req.params.query);
                    break;
                case "article":
                    result = article.get.byID(req.params.query);
                    break;
                /*endregion*/
                /* region owner */
                case "owners":
                    result = owner.get.all(req.params.query);
                    break;
                case "owner":
                    result = owner.get.byID(req.params.query);
                    break;
                /*endregion*/
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

                    let result = {
                        query: req.params.query,
                        users: userList,
                        usersActive: userListActive,
                        usersInactive: userListInactive,
                    };
                    break;
                /*endregion*/
                /* region list */
                case "list":
                    switch (req.params.query) {
                        case "species":
                            result.list = list.get.species();
                            break;
                        case "userRoles":
                            result.list = list.get.userRoles();
                            break;

                        case "all":
                            console.log("list all");
                            result = list.get.all();
                            console.log(result);
                    }
                    break;
                    /*endregion*/
                /* region live search */
                case "live":
                case "all":
                    result = liveRouting(req.params.query);
                /*endregion*/
            }
            res.json(result);
        } catch (e){
            console.log(e);
        }
    });
    function liveRouting(query) {
        let subroute = query.substr(0,3);
        if (subroute === "all/"){
            let realQuery = query.substr(4);
            return liveSearchResults(livesearch.all(realQuery), realQuery);
        } else {
            return liveSearchResults(livesearch.short(req.params.query), req.params.query);
        }
    }
    function liveSearchResults (dbResults, query){
        return {
            query: query,
            owners: dbResults.owner,
            animals: dbResults.animals.alive,
            deadAnimals: dbResults.animals.dead,
            articles: dbResults.articles,
        };
    }
});
