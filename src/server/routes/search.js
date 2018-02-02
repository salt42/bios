"use strict";
let log = require("jsfair/log")("bios-routes/search");

const animal     = require('../../db/animal');
const article    = require('../../db/article');
const list       = require('../../db/list');
const liveSearch = require('../../db/liveSearch');
const owner      = require('../../db/owner');
const mainDetails= require('../../db/mainDetails');

/* region make up live result */
function liveResult (query, dbResults){
    return {
        query:       query,
        owners:      dbResults.owner,
        animals:     dbResults.animals.alive,
        deadAnimals: dbResults.animals.dead,
        articles:    dbResults.articles,
    };
}
/*endregion*/

/* region 1-parted url */
// let routeOne = {
//     type: (type)=>{return null},
// };
/*endregion*/
/* region 2-parted url */
let routeTwo = {
    animals:  (query)=>{ return animal.get.all(query) },
    animal:   (query)=>{ return animal.get.byID(query) },
    articles: (query)=>{ return article.get.all(query) },
    article:  (query)=>{ return article.get.byID(query) },
    owners:   (query)=>{ return owner.get.all(query) },
    owner:    (query)=>{ return owner.get.byID(query) },
    list:     (query)=>{ return list.get[query]()},
    all:      (query)=>{ return routeThree.live("all", query)},
    live:     (query)=>{ return liveResult(query, liveSearch.short(query));
    },
};
/*endregion*/
/* region 3-parted url */
let routeThree = {
    mainDetails: (subType, query)=>{
        if (subType === "animal") {
            return mainDetails.get.byAnimal(query);
        }
        if (subType === "owner") {
            return mainDetails.get.byOwner(query);
        }
    },
    live: (subType, query)=>{ return liveResult(query, liveSearch.all(query));},
};
/*endregion*/

/*region routes*/
hookIn.http_createRoute("/search", function(router) {
    /* region 3-parted url */
    router.get('/:type/:select/:query', function(req, res) {
        let type = req.params.type;
        let select = req.params.select;
        let query = req.params.query;
        let result;
        // console.log("type 'n' select 'n' query", type, select, query);
        try {
            result = routeThree[type](select, query);
            res.json(result);
        } catch (e){
            console.log(e);
        }
    });
    /*endregion*/
    /* region 2-parted url */
    router.get('/:type/:query', function(req, res) {
        let type = req.params.type;
        let query = req.params.query;
        let result;
        // console.log("type 'n' query", type, query);
        try {
            result = routeTwo[type](query);
            res.json(result);
        } catch (e){
            console.log(e);
        }
    });
    /*endregion*/
    /* region 1-parted url */
    // router.get('/:type', function(req, res) {
    //     let type = req.params.type;
    //     let result;
    ////     console.log('only type', type);
    //     try {
    //         result = routeOne[type](query);
    //         res.json(result);
    //     } catch (e){
    //         console.log(e);
    //     }
    // });
    /*endregion*/
});
/*endregion*/
