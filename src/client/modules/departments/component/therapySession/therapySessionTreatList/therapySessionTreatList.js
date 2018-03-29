/**
 * Created by Fry on 17.03.2018.
 */
defineComp("therapy-session-treat-list", function (bios, template, args) {
    "use strict";

    const SELECTION = "tsOverviewSelections";
    const MEMORY = "treatList";
    let self = this;
    let $element = this.$ele;
    let stream = bios.ems.departments.ts.stream;
    let selection = bios.dataService.getMemory("tsSelections");
    bios.pushService.events[SELECTION].subscribe(function (rxData) {
        if(rxData === "update"){
            selection = bios.dataService.getMemory(SELECTION);
            postProcessing();
        }
    });

    this.data.list = [];
    this.onLoad = function () {
        bios.pushService.events[MEMORY].subscribe(function(rxData){
            if(rxData === "update"){
                self.data.list = bios.dataService.getMemory(MEMORY);
                postProcessing();
            }
        });
    };

    function postProcessing(){
        let selectedClass = "selected fa fa-arrow-alt-circle-right";
        if (selection.treat > -1){
            $('li.selected', $element).removeClass(selectedClass);
            $('[data-id="' + selection.treat + '"]', $element).addClass(selectedClass);
        }
    }

    this.onItemClick = function (item) {
        stream.next({
            type: "caseList::selectedTreat",
            data: item,
        });
        selection.treat = item.id;
        bios.dataService.saveMemory(SELECTION, selection);
        bios.departments.treatList(item.id);
    };
});