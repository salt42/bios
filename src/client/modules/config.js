define("Config", function(g) {
    g.AppState.setDebug(false);

    this.States = [{
        name: "therapySession",
        url: "/therapySession",//string, regex, function
        sections: [
            ["main-content", "therapy-session"],
        ],
    },{
        name: "reception",
        url: "/reception",//string, regex, function
        sections: [
            ["main-content", "reception"],
        ],
        sub: [{
            name: "queue",
            url: "/queue",
            // section: [//aber wir können auch sagen wir bauen des feature spaäter ein
            //     ["main-content", "treatment-home"],
            // ],
        }]
    },{
        name: "office",
        url: "/office",//string, regex, function
        sections: [
            ["main-content", "office"],
        ],
        sub: [{
            name: "home",
            url: "/",
            // section: [//aber wir können auch sagen wir bauen des feature spaäter ein
            //     ["main-content", "treatment-home"],
            // ],
        }]
    },{
        name: "administration",
        url: "/a/animal/:id",//string, regex, function
        sections: [
            ["main-content", "administration"],
        ],
    },{
        name: '<div class="settings-icon"></div>settings',
        url: "/settings",//string, regex, function
        sections: [
            ["main-content", "bios-settings"],
        ],
    }
    // ,{
    //     name: "labor",
    //     url: "/a/animal/:id",//string, regex, function
    //     section: [
    //         ["main-content", "sidebar"],
    //     ],
    // },{
    //     name: "office",
    //     url: "/a/animal/:id",//string, regex, function
    //     section: [
    //         ["main-content", "sidebar"],
    //     ],
    // },{
    //     name: "storage",
    //     url: "/a/animal/:id",//string, regex, function
    //     section: [
    //         ["main-content", "sidebar"],
    //     ],
    // },{
    //     name: "pharmacie",
    //     url: "/a/animal/:id",//string, regex, function
    //     section: [
    //         ["main-content", "sidebar"],
    //     ],
    // }
    ];

    // componentHandler.upgradeElements($element[0]);
    // componentHandler.upgradeDom();
});