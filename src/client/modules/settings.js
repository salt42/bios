/**
 * Created by Fry on 19.02.2018.
 */
define("settings", function(bios) {
    "use strict";

    let company = {};
    let companyLogoPath = "";

    this.settings = {};

    /* region company */
    function getCompanyDataFromServer () {
        // let url = "/settings/company";
        // $.ajax({
        //     url: url,
        //     type: "GET",
        //     success: fn
        // });
        // mocking data
        mockingData();
    }

    function mockingData() {
        company = {
            name: "Tierarztpraxis <br>Dr. Wendlberger & Sonntag",
            lineOne:   "Mühlbaurstr. 45",
            lineTwo:   "81667 München",
            lineThree: '<br>',
            lineFour: 'office@tierarztwendlberger.de <br> +49-89-98 06 09',
        };
        companyLogoPath = "/img/company/companyLogo.png";
    }

    getCompanyDataFromServer();

    this.company = company;

    this.companyLogo = companyLogoPath;
    /*endregion*/

    this.settings.therapySession = {
        // get settings
    };
    this.settings.reception = {
        // get settings
    };
    this.settings.office = {
        // get settings
    };
    this.settings.bios = {
        // get settings
    };
});