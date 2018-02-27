/**
 * Created by Fry on 26.02.2018.
 */
define("dummy", function(bios){
    "use strict";

    console.log("loading dummy");
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
        /* region settings.js Module */
        settingsDummyData.company = {
            name: "Tierarztpraxis <br>Dr. Wendlberger & Sonntag",
            lineOne:   "Mühlbaurstr. 45",
            lineTwo:   "81667 München",
            lineThree: '<br>',
            lineFour: 'office@tierarztwendlberger.de <br> +49-89-98 06 09',
        };
        settingsDummyData.companyLogoPath = "/img/company/companyLogo.png";
        /*endregion*/

        /* region departments.js Module */
        /* region queue */
        departmentsDummyData.queue = [
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
        departmentsDummyData.ts = {};
        departmentsDummyData.ts.filterButtons = [
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
        departmentsDummyData.ts.newButton = [
            {
                data: {
                    type: "new",
                },
                id: "new",
                text: "new...",
                class: "far fa-plus-square",
            }
        ];
        departmentsDummyData.ts.newButtons = [
            {
                data: {
                    type: "case",
                },
                id: "add",
                text: "new case",
                class: "far fa-plus-square",
            },{
                data: {
                    type: "treatment",
                    pair: "1",
                },
                id: "add",
                text: "new treatment",
                class: "far fa-plus-square",
            },
            {
                data: {
                    type: "mail",
                    pair: "2",
                },
                id: "new-mail",
                text: "new mail",
                class: "far fa-plus-square fa-envelope",
            },
        ];
        departmentsDummyData.ts.deleteButtons = [
            {
                data: {
                    type: "treatment",
                    pair: "1",
                },
                id: "delete-new",
                text: "discard new",
                class: "hidden fas fa-exclamation-triangle",
            },
            {
                data: {
                    type: "mail",
                    pair: "2",
                },
                id: "delete-new-mail",
                text: "discard mail",
                class: "hidden fas fa-exclamation-triangle fa-envelope",
            }
        ];
        /*endregion*/
        /* region treatment data */
        departmentsDummyData.ts.treatmentData = [
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
        /*endregion*/
    }
});