/**
 * Created by Fry on 19.02.2018.
 */
define({
    name: "settings",
    dependencies: ["dataService", "dummy"]
}, function(bios) {
    "use strict";
    /**
     * @memberOf Global
     * @property {object} settings
     */

    let self = this;

    let company = {};
    let companyLogoPath = "";

    /**
     * @memberOf Global.settings
     * @type {Rx.ReplaySubject}
     */
    this.settingsFeed = new Rx.ReplaySubject();
    /**
     * @memberOf Global.settings
     * @type {{}}
     */
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
        self.settingsFeed.next("company");
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