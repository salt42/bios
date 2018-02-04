define("search", function(bios){
    "use strict";

    function serverSearch(type, searchQuery, fn) {
        let url = "/search/" + type;
        if (searchQuery !== null) url += "/" + searchQuery;
        // if(type.indexOf("list") > -1) console.log('client search url', url);
        $.ajax({
            url: url,
            type: "GET",
            success: fn
        });
    }
    /* region live search */
    this.liveSearch = (searchQuery, fn, option = "short")=>{
        if (option === "short"){
            serverSearch("live", searchQuery, fn);
        }
        else {
            serverSearch("live/all", searchQuery, fn);
        }
    };
    /*endregion*/
    /* region list */
    this.getList = (searchQuery, fn)=>{
        serverSearch("list", searchQuery, fn);
    };
    /*endregion*/

    /* region animal */
    this.findAnimals = (searchQuery, fn)=>{
        serverSearch("animals", searchQuery,fn);
    };
    this.findAnimal = (searchQuery, fn)=>{
        serverSearch("animal", searchQuery,fn);
    };
    /*endregion*/

    /* region article */
    this.findArticles = (searchQuery, fn)=>{
        serverSearch("articles", searchQuery,fn);
    };
    this.findArticle = (searchQuery, fn)=>{
        serverSearch("article", searchQuery,fn);
    };
    /*endregion*/

    /* region owner */
    this.findOwners = (searchQuery, fn)=>{
        serverSearch("owners", searchQuery,fn);
    };
    this.findOwner = (searchQuery, fn)=>{
        serverSearch("owners", searchQuery,fn);
    };
    /*endregion*/

    this.mainDetails = function (type, searchQuery, fn) {
        serverSearch("mainDetails/" + type, searchQuery, fn);
    }
    this.getName = function (type, searchQuery, fn) {
        serverSearch("getName/" + type, searchQuery, fn);
    }
});