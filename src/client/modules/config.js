define("Config", function() {
    this.States = [{
        name: "therapySession",
        url: "/therapySession",//string, regex, function
        section: [
            ["main-content", "therapy-session"],
        ],
    },{
        name: "reception",
        url: "/reception",//string, regex, function
        section: [
            ["main-content", "d-reception"],
        ],
        sub: [{
            name: "home",
            url: "/",//schau mal wie schwer des zu implen is
            // section: [//aber wir können auch sagen wir bauen des feature spaäter ein
            //     ["main-content", "treatment-home"],
            // ],
        }]
    },{
        name: "administration",
        url: "/a/animal/:id",//string, regex, function
        section: [
            ["main-content", "administration"],
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