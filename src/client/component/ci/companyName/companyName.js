defineComp("company-name", function(bios, template, args) {
    "use strict";
    let self = this;
    let $element = this.$ele;
    this.data.c = {};

    this.onLoad = function () {
        bios.settings.settingsFeed.subscribe(function(rxData){
            if(rxData === "company"){
                self.data.c = bios.settings.company
            }
            postProcessing();
        });
    };
    function postProcessing () {
        let lines = $('p', $element);
        for (let i = 0; i < lines.length; i++) {
            let text = $(lines[i]).text();
            $(lines[i]).html(text);

        }
    }

}, {
    templatePath:"/component/ci/companyName/companyName.html"
});