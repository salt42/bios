defineComp("fc-overview", function(bios, $element, args) {
    "use strict";

    const ANIMAL = "animal";
    const OWNER = "owner";
    const TREATMENT = "treatment";

    const limitTreatments = 5; // perhaps set by config file

    let $selectBox = $("div#fco-selected").appendTo( $("section#top-bar") );

    bios.ems.onStateChange.subscribe(function(data) {
        if (data.state === "liveSearch"){
            //und wo klempt es jetzt nirgends.. ich finde es nur übel viel code
            bios.search.mainDetails(data.data.type, data.data.id, function (dbData) {
                //und hier holt er die daten
                processData(dbData);
            } );
        }
    });

    function render(data) {
        let template = document.importNode($(".me")[0].content, true);
        //hier machst du sachen damit
        $("ul", $element).append(template);
        //des is schön schnell und solte den code ein bisal kürtzen
    }
    /* region main function */
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
                if (data[i].type === OWNER) {
                    appendStylesAndData(data[i], i).appendTo($fragmentO);
                }
                if (data[i].type === ANIMAL) {
                    if (data[i].state === 1) {
                        appendStylesAndData(data[i], i).appendTo($fragmentD);
                    }
                    else {
                        appendStylesAndData(data[i], i).appendTo($fragmentA);// geht es hier verloren ne warum so
                    }
                    if (data[i].selected === true && data[i].treatments && data[i].treatments.length > 0) {
                        $fragmentT = appendTreatments (data[i].treatments);
                    }
                }
            }
            $("ul.owner")      .empty()  .append($fragmentO);
            $("ul.animal")     .empty()  .append($fragmentA);
            $("ul.treatment")  .empty()  .append($fragmentT);
            $("ul.dead")       .empty()  .append($fragmentD);

            $("li.foo-item").on("click", function (e) {
                fillInDetails (e);
                let pos = $(e.currentTarget).data("position"); // hier ist es jedenfalls nicht mehr drauf, also die O D A sind die einzelenen bereiche? ja ok des is eh hässlich du
                //kannst hier schon sub comps benutzen aber halt mit einer setData methode die du von hier bedienst,  // ja das hätte ich ja morgen gemacht aber tu mir einen gefalen und push dann mal also heute
                $("ul.treatment")
                    .empty()
                    .append(appendTreatments(data[pos].treatments))
                ;
            });
        } catch (e) {
            console.log("error in fcOverview.processData")
            console.log('e',e);
        }
    }
    /*endregion*/
    /* region auxiliaries */
    function appendStylesAndData(data, i){
        let $ele = $("<li></li>")
            .addClass("foo-item")
            .attr("data-position", i)
        ;

        // da kürze ich morgen uu noch einiges... bin heute auf ne recht gute idee gekommen das zu minimieren
        //ja einfach des daten ele an des dom ele hängen
        // das geht so aber nicht  wiso solte des nich gehen
        // wenn ich das hier drinnen draufpacke
        if(data.type === OWNER || data.type === ANIMAL) $ele
            .addClass( "fco-" + data.type )
            .attr("data-type", data.type)
            .attr("data-id", data.id)
            .attr("data-name", data.name)
            .attr("data-selected", data.selected)
            .attr("data-type-of", data.typeOf)
            .append( createNameTag(data.name) )
        ;
        if (data.type === ANIMAL) $ele
            .attr("data-type-of", data.typeOf)
            .attr("data-birthday", data.birthday)
            .attr("data-weight", data.weight.weight)
            .prepend( createSpeciesTag(data.typeOf) )
        ;
        if (data.type === TREATMENT) {
            let name = (data.treatment) ? data.treatment : " ";
            name = (data.diagnosis) ? data.diagnosis : name;
            name = (data.name) ? data.name : name;
            $ele
                .addClass( "fco-" + data.type )
                .attr("data-type", data.type)
                .attr("data-id", data.id)
                .attr("data-name", name)
                .text(name)
            ;
        }
        if (data.selected === true) fillInDetails({currentTarget: $ele});
        return $ele;
    }
    /* region create tags */
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
    /*endregion*/
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
    function appendTreatments (treatments){
        let $fragment = $(document.createDocumentFragment());
        let limit = (limitTreatments < treatments.length) ? limitTreatments : treatments.length;
        for (let i = 0; i < limit; i++) {
            appendStylesAndData(treatments[i]).appendTo($fragment);
        }
        return $fragment;
    }
    /*endregion*/
}, {
    templatePath: "/component/flashcard/fcOverview/fcOverview.html"
});