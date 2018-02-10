defineComp("header", function(bios, template, args) {
    "use strict";

    let $element = this.$ele;

    this.onLoad = function() {
        // componentHandler.upgradeElements(template[0].querySelector(".mdl-textfield"));
        componentHandler.upgradeDom();
    };
}, {
    templatePath: "/component/header/header.html"
});