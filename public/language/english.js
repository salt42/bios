window.trans = new Map();

let helper;

//Enums
helper = "GENDER";
trans.set(helper + "_" + "0", "male");
trans.set(helper + "_" + "1", "female");
helper = "USER_ROLE";
trans.set(helper + "_" + "0", "apprentice"        );
trans.set(helper + "_" + "1", "doctor's assistant");
trans.set(helper + "_" + "2", "assistant doctor"  );
trans.set(helper + "_" + "3", "doctor"            );