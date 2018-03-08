/**
 * Created by Fry on 16.02.2018.
 */
defineComp("therapy-queue",  function (bios, template, args) {
    "use strict";

    let department = "therapy-queue";
    let data;
    bios.departments.load(department);

    this.onLoad = function () {
        bios.departments.ready.subscribe(function(rxData){
            if(rxData.department === department){
                data = bios.departments.global.treatmentQueue;
                let c = 0;
                $('#bios-queue').appendTemplate(".bios-ts-queue.list-item-template", data, function (fragment, value){
                    let call = bios.trans.late("later treatment");
                    if (c === 0){
                        $('div.bios-queue-item', fragment).addClass("selected");
                        c++;
                        call = bios.trans.late("next treatment");
                    }
                    $('div.bios-queue-item', fragment).attr("data-id", value.animal_id);
                    $('span.name', fragment).text(value.name + ', ' + value.first_name);
                    $('span.animal', fragment).text(value.animal);
                    $('span.reason', fragment).text(value.reason);
                    $('div.mdl-card__actions a', fragment).text(call);
                });
                bios.trans.log();
            }
        });
    };


}, {
    templatePath: "/component/departments/therapyQueue/therapyQueue.html"
});