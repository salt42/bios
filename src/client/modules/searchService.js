define({
    name: "search",
    dependencies: ["dbService"]
}, function(bios){
    "use strict";
    /**
     * @namespace Global
     * @property {object} search
     */

    let serverSearch = bios.dbService.serverSearch;

    /* region live search */
    this.liveSearch = (searchQuery, option = "short")=>{
        if (option === "short"){
            return serverSearch("live", searchQuery);
        }
        else {
            return serverSearch("live/all", searchQuery);
        }
    };
    /*endregion*/
    /* region list */
    this.getList = (searchQuery, fn)=>{
        return serverSearch("list", searchQuery).then(fn);
    };
    /*endregion*/

    /* region animal */
    this.findAnimals = (searchQuery, fn)=>{
        return serverSearch("animals", searchQuery).then(fn);
    };
    this.findAnimal = (searchQuery, fn)=>{
        return serverSearch("animal", searchQuery).then(fn);
    };
    /*endregion*/

    /* region article */
    this.findArticles = (searchQuery, fn)=>{
        return serverSearch("articles", searchQuery).then(fn);
    };
    this.findArticle = (searchQuery, fn)=>{
        return serverSearch("article", searchQuery).then(fn);
    };
    /*endregion*/

    /* region owner */
    this.findOwners = (searchQuery, fn)=>{
        return serverSearch("owners", searchQuery).then(fn);
    };
    this.findOwner = (searchQuery, fn)=>{
        return serverSearch("owners", searchQuery).then(fn);
    };
    /*endregion*/

    this.mainDetails = function (type, searchQuery, fn) {
        return serverSearch("mainDetails/" + type, searchQuery).then(fn);
    }
    this.getName = function (type, searchQuery, fn) {
        return serverSearch("getName/" + type, searchQuery).then(fn);
    }

    this.customerData = function (id, idType) {
        return serverSearch("customerData/" + id, idType);
    }
});