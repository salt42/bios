define("Config", function(g) {
    g.AppState.setDebug(false);

    /* region Therapy Session States */
    let tsStates = [
        {
            name: "therapy session queue",
            url: "/therapySession/queue",//string, regex, function
            skip: true, // lets append template skip this entry
            sections: [
                ["main-content", "therapy-queue"],
            ],
        },{
            name: "therapy session treatment",
            url: "/therapySession/treatment/:id/treat",//string, regex, function
            skip: true, // lets append template skip this entry
            sections: [
                ["main-content", "therapy-session-case"],
            ],
        },{
            name: "therapy session treatment",
            url: "/therapySession/treatment/:id",//string, regex, function
            skip: true, // lets append template skip this entry
            sections: [
                ["main-content", "therapy-session-overview", {id: "test"}],
            ],
        },{
            name: "therapy session",
            url: "/therapySession/dashboard",//string, regex, function
            skip: false,
            sections: [
                ["main-content", "therapy-session"],
            ],
        },{
            name: "therapy session",
            url: "/therapySession",//string, regex, function
            skip: false,
            sections: [
                ["main-content", "therapy-session"],
            ],
        /*sub: [{
                name: "queue",
                url: "/queue",
                section: [//aber wir können auch sagen wir bauen des feature spaäter ein
                    ["main-content", "therapy-queue"],
                ],
            }]*/
        },
    ];
    /*endregion*/
    /* region Reception States */
    let receptionStates = [
        {
            name: "reception",
            url: "/reception",//string, regex, function
            sections: [
                ["main-content", "reception"],
            ],
        }
    ];
    /*endregion*/
    /* region Office States */
    let officeStates = [
        {
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
        },
    ];
    /*endregion*/

    let defaultStates = [{
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
    //     name: "pharmacie",
    //     url: "/a/animal/:id",//string, regex, function
    //     section: [
    //         ["main-content", "sidebar"],
    //     ],
    // }
    ];

    // componentHandler.upgradeElements($element[0]);
    // componentHandler.upgradeDom();

    let a = [];
    this.States = a.concat(tsStates, receptionStates, officeStates, defaultStates);
});