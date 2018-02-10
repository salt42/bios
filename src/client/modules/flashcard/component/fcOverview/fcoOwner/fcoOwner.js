/**
 * Created by Fry on 09.02.2018.
 */
defineComp("fco-owner", function(bios, $element, args) {
    "use strict";

    console.log("COMP fco-owner loaded");
    this.setData = createSubCompEntries;

    function createSubCompEntries(data, req) {
        console.log('subComp', data);
        let $fragmentO = $(document.createDocumentFragment());

        for (let i = 0; i < data.length; i++) {
            bios.flashcard.appendStylesAndData_owner(data[i], i).appendTo($fragmentO);
        }
    }
});
