window.trans = new Map();

let helper;

//Enums
helper = "GENDER";
trans.set(helper + "_" + "0", "männlich");
trans.set(helper + "_" + "1", "weiblich");
trans.set(helper + "_" + "2", "unbekannt");

// translations default in lowercase
trans.set("gender", "geschlecht");
trans.set("first name", "Vorname");
trans.set("died", "verstorben");
