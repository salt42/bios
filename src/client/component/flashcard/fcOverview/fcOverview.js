defineComp("fc-overview", function(bios, $element, args) {
    "use strict";

    console.log('Comp fc-overvie loaded');
    let $selectBox = $("div#fco-selected").appendTo($("section#top-bar"));

    bios.ems.onStateChange.subscribe(function(data) {
        if (data.state === "liveSearch"){
            bios.search.mainDetails(data.data.type, data.data.id, function (dbData) {
                processData(dbData);
            } );
        }
    });
    function processData (data) {
        try {
            let $fragmentO = $(document.createDocumentFragment());
            let $fragmentA = $(document.createDocumentFragment());
            let $fragmentT = $(document.createDocumentFragment());
            let $fragmentD = $(document.createDocumentFragment());

            data.sort(function (a, b) {
                a.name = (!a.name || a.name === null || a.name === "") ? bios.trans.late("unknown") : a.name;
                b.name = (!b.name || b.name === null || b.name === "") ? "unknown" : b.name;
                return ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0));
            });

            bios.ems.flashcard.next({
                origin: "overview",
                data: data,
            });

            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "owner") {
                    appendStylesAndData(data[i]).appendTo($fragmentO);
                }
                if (data[i].type === "animal") {
                    if (data[i].state === 1) {
                        appendStylesAndData(data[i]).appendTo($fragmentD);
                    }
                    else {
                        appendStylesAndData(data[i]).appendTo($fragmentA);
                    }
                }
            }
            $("ul.owner")    .append($fragmentO);
            $("ul.animal")   .append($fragmentA);
            $("ul.treatment").append($fragmentT);
            $("ul.dead")     .append($fragmentD);

            $("li.foo-item").on("click", fillInDetails);
        } catch (e) {
            console.log("error in fcOverview.setData")
            console.log(e);
        }
    }

    function appendStylesAndData(data){
        let $ele = $("<li></li>")
            .addClass( "foo-item fco-" + data.type )
            .attr("data-type", data.type)
            .attr("data-id", data.id)
            .attr("data-name", data.name)
            .attr("data-selected", data.selected)
            .attr("data-type-of", data.typeOf)
            .attr("data-birthday", data.birthday)
            .attr("data-weight", data.weight)
            .append( createNameTag(data.name) )
        ;
        if (data.type === "animal") $ele.prepend( createSpeciesTag(data.typeOf) );
        if (data.selected === true) fillInDetails({currentTarget: $ele});
        return $ele;
    }
    function createSpeciesTag(specie) {
        return $("<span></span>")
            .addClass("species")
            .html( bios.trans.enum.species(specie) )
        ;
    }
    function createNameTag(name) {
        return $("<p></p>")
            .addClass("name")
            .html(name)
        ;
    }
    function createAgeTag(birthday) {
        return $("<span></span>")
            .addClass("age")
            .html(bios.trans.age(birthday))
        ;
    }
    function createWeightTag(weight) {
        return $("<p></p>")
            .addClass("weight")
            .html( weight + " kg" )
        ;
    }
    function fillInDetails(e){
        if($(e.currentTarget).data("type") === "animal"){
            $selectBox
                .empty()
                .append( createNameTag( $(e.currentTarget).data("name") ) )
                .prepend( createSpeciesTag($(e.currentTarget).data("typeOf")) )
                .append( createAgeTag( $(e.currentTarget).data("birthday") ) )
                .append( createWeightTag( $(e.currentTarget).data("weight") ) )
            ;
        }
        if($(e.currentTarget).data("type") === "owner"){
            $selectBox
                .empty()
                .append( createNameTag( $(e.currentTarget).data("name") ) )
            ;
        }
    }

}, {
    templatePath: "/component/flashcard/fcOverview/fcOverview.html"
});