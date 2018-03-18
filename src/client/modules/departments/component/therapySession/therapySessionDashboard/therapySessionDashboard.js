/**
 * Created by Fry on 17.02.2018.
 */
defineComp("therapy-session-dashboard",  function (bios, template, args) {
    "use strict";
/* region init */
    /* region vars */
    let $element = this.$ele;
    let department = "therapy-session";
    let comp = "dashboard";
    let self = this;
    /*endregion*/
    /* region internal notification*/
    this.ready = new Rx.ReplaySubject();
    let loader = new Rx.ReplaySubject();
    let queueLoaded = false;
    let dataLoaded = false;
    let stream = bios.ems.departments.ts.stream;
    /*endregion*/
    /* region data handling */
    this.data.cards = [];
    /*endregion*/
    /* region post modification */
    let modified = false;
    /*endregion*/
    update();
/*endregion*/

/*region get external component/data */
    bios.ems.departments.queue.subscribe(function(rxData){
        if (rxData === "ready") loader.next("queue ready");
    });
/*endregion*/
/* region manage ready state */
    loader.subscribe(function(rxData){
        if (rxData === "queue ready") queueLoaded = true;
        if (rxData === "data ready" ) dataLoaded  = true;

        if (queueLoaded === true && dataLoaded === true) self.ready.next("ready");
    });
/*endregion*/

    this.onLoad = function (){
        // get component data
        bios.departments.ready.subscribe(function(rxData) {
            if (rxData.department === department && rxData.comp === comp) {
                self.data.cards = prepareData(bios.departments.therapySession.cards);
                loader.next("data ready");
            }
        });

        self.ready.subscribe(function(rxData){
            if(!modified){
                let $modify = $().add($('[data-type="element::text"]', $element)).add($('[data-type="html::text"]', $element));
                for (let i = 0; i < $modify.length; i++) {
                    let inside = $('span.top', $modify[i]).text();
                    $('span.top', $modify[i]).html($(inside));
                }
                modified = true;
            }
        });
    };
    this.clickOnItem = (item=>{
        if (item.buttonUrl) bios.AppState.goToUrl(item.buttonUrl);
    });

    function prepareData(data) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].type) data[i].type = "text::text";  //set default type
            let parts = data[i].type.split("::");
            data[i].top    = createCardStrings(parts[0], data[i].text);
            data[i].bottom = createCardStrings(parts[1], data[i].buttonText);
        }
        return data;
    }

    function createCardStrings (type, objData) {
        if(type === "img")
            return "<img src='" + objData + "' class='ts-dash-card-image' alt='image'>";
        else
            return objData;
    }

    function update() {
        bios.departments.load(department, comp);
        modified = false;
    }
}, {
    templatePath: "/component/departments/therapySession/dashboard/dashboard.html"
});