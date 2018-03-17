/**
 * Created by Fry on 16.02.2018.
 */
defineComp("therapy-queue",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let self = this;
    let department = "therapy-queue";
    let data;
    this.data.items = [];
    // bios.departments.load(department);
    update();
    // this.data;
    this.onLoad = function () {
        componentHandler.upgradeElements($element);
        bios.departments.ready.subscribe(function(rxData) {
            if (rxData.department === department) {
                data = bios.departments.global.treatmentQueue.queue;
                self.data.items = data;
                // let c = 0;
                // $('#bios-queue')
                //     .empty()
                //     .appendTemplate("#template-therapy-queue-item", data, function (fragment, value){
                //         let call = bios.trans.late("later treatment");
                //         if (c === 0){
                //             $('div.bios-queue-item', fragment).addClass("selected");
                //             c++;
                //             call = bios.trans.late("next treatment");
                //         }
                //         $('div.bios-queue-item', fragment).attr("data-id", value.animal_id);
                //         $('span.name', fragment).text(value.name + ', ' + value.first_name);
                //         $('span.animal', fragment).text(value.animal);
                //         $('span.reason', fragment).text(value.reason);
                //         $('div.mdl-card__actions a', fragment).text(call);
                //     });
            }
            bios.ems.departments.queue.next("ready");
        });
    };
    this.getNext = function(){
        return data[0];
    };
    this.goTo = function (item) {
        bios.AppState.goToUrl("/treatment/" + item.id);
    };
    function update() {
        bios.departments.load(department);
    }
});