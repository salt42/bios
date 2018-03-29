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
    bios.departments.load(department);

    this.onLoad = function () {
        componentHandler.upgradeElements($element);
        bios.pushService.events.tsQueue.subscribe(function(rxData) {
            //caution!  "update"  === updated Push service;
            //          "updated" === updated departments.js data!
            if (rxData === "updated") {
                update().then(()=>{
                    bios.ems.departments.queue.next("ready");
                })
            }
        });
    };
    function update(){
        return new Promise(function (resolve, reject){
            data = bios.departments.global.tsQueue.queue;
            self.data.items = data;
            resolve();
        });
    }
    this.goTo = function (item) {
        console.log(item);
        bios.AppState.goToUrl("/therapySession/treatment/" + item.animal_id);
    };
});