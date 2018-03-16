defineComp("link-bar", function (bios, template, args) {
    "use strict";

    // console.log('link bar', bios.Config.States);
    let $element = this.$ele;

    this.onLoad = function () {
        $('span.mdl-layout-title').html('BIOS nav');

        let navbar = $('nav.mdl-navigation');
        navbar.appendTemplate("#template-link-bar-url-link", bios.Config.States, function (navEntry, value) {
            $('a', navEntry)
                .attr("url", value.url)
                .html(value.name);
        });

        // click action
        $('a', $element).on("click", function (e) {
            let url = $(e.target).attr("url");
            let state = $(e.target).attr("state");
            hideNav();
            if (url)
                bios.AppState.goToUrl(url);
            // else if (state)
            //     bios.AppState.goToState(state);
        });
    };
    function hideNav() {
        $('link-bar')
            .removeClass("is-visible")
            .attr("aria-hidden", true);
        $('div.mdl-layout__obfuscator').removeClass("is-visible");
    }

}, {
    templatePath: "/component/link/linkBar.html"
});