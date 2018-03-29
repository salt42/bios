/**
 * Created by Fry on 26.02.2018.
 */
define({
    name: "dummy",
    dependencies: ["dataService"]
}, function(bios){
    "use strict";
    /**
     * @namespace Global
     * @property {object} dummy
     */

    // the "aaDummyData.js filename is needed to be loaded save as first module (!!dependencies!!)
    // console.log("loading dummy");
    let departmentsDummyData = {};
    let settingsDummyData = {};
    this.queue = [];

    setDummies();

    this.departments = function(){
        return departmentsDummyData;
    };

    this.settings = function() {
        return settingsDummyData;
    };

    //set data
    function setDummies() {
        let a = {};
        /* region settings.js Module */
        a.company = {
            name: "Tierarztpraxis <br>Dr. Wendlberger & Sonntag",
            lineOne:   "Mühlbaurstr. 45",
            lineTwo:   "81667 München",
            lineThree: '<br>',
            lineFour: 'office@tierarztwendlberger.de <br> +49-89-98 06 09',
        };
        a.companyLogoPath = "/img/company/companyLogo.png";
        settingsDummyData = a;
        /*endregion*/

        /* region departments.js Module */
        a = {};
        /* region queue */
        bios.dataService.saveMemory("tsQueue", [
            {
                name: "Söllner",
                first_name: "Hans",
                animal: "Charly",
                animal_id: 123,
                reason: "Smoke comes out"
            },
            {
                name: "Polizei",
                first_name: "Bundes",
                animal: "xray",
                animal_id: 1040,
                reason: "Smoking hot"
            },
            {
                name: "Söllner",
                first_name: "Hansines",
                animal: "Charlynes",
                animal_id: 345,
                reason: "Smoke comes out"
            }
        ]);
        /*endregion*/
        /* region buttons */
        a.ts = {};
        a.ts.filterButtons = [
            {
                data: {
                    type: "filter",
                },
                id: "mail",
                text: "mails"
            },{
                data: {
                    type: "filter",
                },
                id: "treatment",
                text: "treatments"
            },{
                data: {
                    type: "filter",
                },
                id: "all",
                text: "all"
            },
        ];
        a.ts.buttonBars = [
            {
                wrapperID: "new",
                topButton: {
                    data: {
                        type: "new",
                    },
                    id: "new",
                    text: "new...",
                    class: "far fa-plus-square",
                },
                buttonPairs: [
                    {
                        shown: {
                            data: {
                                type: "case",
                            },
                            id: "add",
                            text: "case",
                            class: "far fa-plus-square",
                        },
                    },{
                        shown: {
                            data: {
                                type: "treatment",
                                pair: "1",
                            },
                            id: "add",
                            text: "treatment",
                            class: "far fa-plus-square",
                        },
                        hidden: {
                            data: {
                                type: "treatment",
                                pair: "1",
                            },
                            id: "delete-new-treatment",
                            text: "treatment",
                            class: "hidden fas fa-minus-square",
                        }
                    },
                    {
                        shown: {
                            data: {
                                type: "mail",
                                pair: "2",
                            },
                            id: "new-mail",
                            text: "mail",
                            class: "far fa-plus-square fa-envelope",
                        },
                        hidden: {
                            data: {
                                type: "mail",
                                pair: "2",
                            },
                            id: "delete-new-mail",
                            text: "mail",
                            class: "hidden fas fa-minus-square",
                        }
                    },
                ]
            }
        ];
        /*endregion*/
        /* region treatment data */
        a.ts.treatmentData = {};
        a.ts.treatmentData.treatment = [
            {
                type: "treatment",
                diagnosis: "oldest",
                date: "01.02.03"
            },
            {
                type: "treatment",
                diagnosis: "older",
                date: "03.02.03"
            },{
                type: "treatment",
                diagnosis: "old",
                date: "04.02.03"
            },
        ];
        a.ts.treatmentData.mail = [
            {
                type: "mail",
                text: "kjahskjdhjashjks",
                date: "02.02.03"
            }
        ];
        a.ts.cases = [
            {
                id: 42,
                description: "aua aua Bein",
                treatments: 10,
                date: "01.02.02",
                lastTreatment: "20.03.03",
            }, {
                id: 24,
                description: "aua aua Kopf",
                treatments: 4,
                date: "01.12.12",
                lastTreatment: "20.12.12",
            }, {
                id: 35,
                description: "aua aua Bauch",
                treatments: 2,
                date: "13.06.04",
                lastTreatment: "15.06.04",
            },
        ];

        function concatANDsortByDate (a1, a2){
            let res = a1.concat(a2);
            res.sort((a,b)=>{
                let da = new Date(a.date).getTime();
                let db = new Date(b.date).getTime();
                return (da>db) ? 1 : (da === db) ? 0 : -1;
            });
            return res;
        }
        a.ts.treatmentData.all = concatANDsortByDate(a.ts.treatmentData.treatment, a.ts.treatmentData.mail);

        a.ts.customerData = {
            owner: [
                122, 142
            ],
            animal: [
                123, 124, 125
            ]
        };
        /*endregion*/
        departmentsDummyData = a;
        /*endregion*/
        /*region caseList*/
        function caseListDummy (count){
            let res = [];
            for (let i = 0; i < count; i++) {
                res.push({
                    id: i,
                    description: "case " + i
                })
            }
            return res;
        }
        bios.dataService.saveMemory("caseList", caseListDummy(5));
        /*endregion*/
        /*region treatList*/
        function treatListDummy (count){
            let res = [];
            for (let i = 0; i < count; i++) {
                res.push({
                    id: i,
                    description: "treat " + i
                })
            }
            return res;
        }
        bios.dataService.saveMemory("treatList", treatListDummy(5));
        /*endregion*/
    }
});