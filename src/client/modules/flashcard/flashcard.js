/**
 * Created by Fry on 09.02.2018.
 */
define("flashcard", function(bios) {
    "use strict";

    const ANIMAL = "animal";
    const OWNER = "owner";
    const TREATMENT = "treatment";

    const limitTreatments = 5; // perhaps set by config file
    let self = this;

    bios.ems.fcDetails = new Rx.ReplaySubject();


    /* region public functions */
    /* region - append styles and data */
    this.appendStylesAndData_owner = (data, i)=>{
        let $ele = _appendStylesAndData_common(data, i);
            $ele = _appendStylesAndData_owner_animal(data, $ele);
        return $ele;
    };
    this.appendStylesAndData_animal = (data, i)=>{
        let $ele = _appendStylesAndData_common(data, i);
            $ele = _appendStylesAndData_owner_animal(data, $ele);
            self.fillInDetails({currentTarget: $ele}, data);
        return $ele;
    };
    this.appendStylesAndData_treatment = (data, i)=>{
        let $ele = _appendStylesAndData_common(data, i);
            $ele = _appendStylesAndData_treatment(data, $ele);
        return $ele;
    };
    /*endregion*/
    /* region - transfer to details box */
    this.fillInDetails = (e, data)=>{
        bios.ems.fcDetails.next({
            position: $(e.currentTarget).data("position"),
            data: data,
        });
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
    /*endregion*/
    /*endregion*/

    /* region auxiliaries */

    /* region - append styles and data aux */
    function _appendStylesAndData_common(data, i) {
        return $("<li></li>")
            .addClass("foo-item")
            .attr("data-position", i)
            ;
    }
    function _appendStylesAndData_owner_animal(data, $ele) {
        $ele
            .addClass( "fco-" + data.type )
            .attr("data-type", data.type)
            .attr("data-id", data.id)
            .attr("data-name", data.name)
            .attr("data-selected", data.selected)
            .attr("data-type-of", data.typeOf)
            .append( createNameTag(data.name) )
        ;
        if (data.type === ANIMAL)
            _appendStyleAndData_animal(data, $ele);
        return $ele;
    }
    function _appendStyleAndData_animal(data, $ele) {
        $ele
            .attr("data-type-of", data.typeOf)
            .attr("data-birthday", data.birthday)
            .attr("data-weight", data.weight.weight)
            .prepend( createSpeciesTag(data.typeOf) )
        ;
        return $ele;
    }
    function _appendStylesAndData_treatment(data, $ele) {
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
        return $ele;
    }
    /*endregion*/

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
    function appendTreatments (treatments){
        let $fragment = $(document.createDocumentFragment());
        let limit = (limitTreatments < treatments.length) ? limitTreatments : treatments.length;
        for (let i = 0; i < limit; i++) {
            appendStylesAndData(treatments[i]).appendTo($fragment);
        }
        return $fragment;
    }
    /*endregion*/

});