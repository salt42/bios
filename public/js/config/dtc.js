function dtc() {
    "use strict";

    let dtc = [];

    // default
    dtc["default"] = {
        name: "default",
        data: null,
        allColumns: [],
        columns: [],
        renameColumns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    // example usage of tableSettings.translateColumns
    // tableSettings.translateColumns["country"] = trans("country");
    // tableSettings.translateColumns["Zip"] = trans("Zip");

    let name = "";
    let tableSettings = {};
    // example adding new pattern
    name = "owners";
    tableSettings = {
        name: name,
        data: null,
        allColumns: [],
        columns: [],
        renameColumns: [],
        config: {
            ordering: true,
            select: true,
        }
    };
    dtc[name] = tableSettings;

    window.dtc = dtc;
}
dtc();