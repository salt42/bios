defineComp("sidebar", function (bios, $element, args) {
    "use strict";

    bios.ems.onStateChange.subscribe(function(data) {
        if (data.state === "liveSearch"){
            bios.sections.load("section-sidebar-top", "fc-overview");
        }
    })
}, {
    templatePath: "/component/sidebar/sidebar.html"
});