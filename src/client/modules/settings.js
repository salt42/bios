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
        //@todo
        // let url = "/settings/company";
        // $.ajax({
        //     url: url,
        //     type: "GET",
        //     success: fn
        // });

        // mocking data
        let dummyData = bios.dummy.settings();
        company = dummyData.company;
        companyLogoPath = dummyData.companyLogoPath;
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