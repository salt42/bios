function dtc() {
    "use strict";

    let helper;
    let listOfAllTables = [];
    let dtc = [];

    // default
    let name = "default";

    let tableSettings = {
        name: name,
        data: null,
        allColumns: [],
        columns: [],
        translateColumns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    // tableSettings.translateColumns["country"] = trans("country");
    // tableSettings.translateColumns["Zip"] = trans("Zip");
    // do stuff
    dtc[name] = tableSettings;

    // bla
    name = "owners";
    tableSettings = {
        name: name,
        data: null,
        allColumns: [],
        columns: [],
        translateColumns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    // tableSettings.translateColumns["country"] = trans("country");
    // tableSettings.translateColumns["Zip"] = trans("Zip");
    dtc[name] = tableSettings;

    window.dtc = dtc;
}
dtc();