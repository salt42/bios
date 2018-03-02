/**
 * Created by Fry on 26.02.2018.
 */
define("dummy", function(bios){
    "use strict";

    // the "aaDummyData.js filename is needed to be loaded save as first module (!!dependencies!!)
    // console.log("loading dummy");
    let departmentsDummyData = {};
    let settingsDummyData = {};

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
        a.queue = [
            {
                name: "Söllner",
                first_name: "Hans",
                animal: "Charly",
                animal_id: 123,
                reason: "Smoke comes out"
            },
            {
                name: "Söllner",
                first_name: "Hans",
                animal: "Charly",
                animal_id: 234,
                reason: "Smoke comes out"
            },
            {
                name: "Söllner",
                first_name: "Hans",
                animal: "Charly",
                animal_id: 345,
                reason: "Smoke comes out"
            }
        ];
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
        a.ts.treatmentData = [
            {
                type: "treatment",
                diagnosis: "oldest",
                date: "01.02.03"
            },{
                type: "mail",
                text: "kjahskjdhjashjks",
                date: "02.02.03"
            },{
                type: "treatment",
                diagnosis: "older",
                date: "03.02.03"
            },{
                type: "treatment",
                diagnosis: "old",
                date: "04.02.03"
            },
        ];
        /*endregion*/
        departmentsDummyData = a;
        /*endregion*/
    }
});