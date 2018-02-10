defineComp("header", function(bios, template, args) {
    "use strict";

    this.onLoad = function() {
        // componentHandler.upgradeElements(template[0].querySelector(".mdl-textfield"));
        componentHandler.upgradeDom();
    };
}, {
    templatePath: "/component/header/header.html"
});
//ich bin nur gerade noch planlos was ich bauen soll  bau mal ne behandlungs dashboard comp und dann stell dir den normalsen fall vor wie du anfängst
//wenn du in deiner queue den nächsten patienten bzw fall siehst (die queue musst du dir auch vorstellen kk)