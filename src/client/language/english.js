window.trans = new Map();

let helper;
//information
trans.set("bios_language", "en_en");

//Enums
helper = "GENDER";
let i = 0;
trans.set(helper + "_" + i++, "male"    );
trans.set(helper + "_" + i++, "female"  );
trans.set(helper + "_" + i++, "unknown" );

helper = "SPECIES";
i = 1;
trans.set(helper + "_" + i++, "dog"     );
trans.set(helper + "_" + i++, "cat"     );
trans.set(helper + "_" + i++, "bird"    );
trans.set(helper + "_" + i++, "rodent"  );
trans.set(helper + "_" + i++, "turtle"  );
trans.set(helper + "_" + i++, "horse"   );
trans.set(helper + "_" + i++, "cow"     );
trans.set(helper + "_" + i++, "pig"     );
trans.set(helper + "_" + i++, "deer"    );
trans.set(helper + "_" + i++, "unknown" );
trans.set(helper + "_" + i++, "calf"    );

//core trans
trans.set("liveSearch placeholder",     "Search..."         );


trans.set("owner_id",     "owner ID"         );
trans.set("first_name",   "first name"       );
trans.set("name",         "name"             );
trans.set("salutation_2", "salutation 2"     );
trans.set("first_name_2", "first name 2"     );
trans.set("name_2",       "name 2"           );
trans.set("address_2",    "address 2"        );
trans.set("zip_2",        "zip 2"            );
trans.set("city_2",       "city 2"           );
trans.set("country_",     "country 2"        );
trans.set("telephone_1",  "telephone"        );
trans.set("telephone_2",  "telephone 2"      );
trans.set("telephone_3",  "telephone 3"      );
trans.set("telephone_4",  "telephone 4"      );
trans.set("e_mail",       "e-Mail"           );
trans.set("cave",         "CAVE"             );
trans.set("cave_text",    "CAVE description" );
trans.set("reminder_1",   "reminder"         );
trans.set("reminder_2",   "reminder 2"       );
trans.set("reminder_3",   "reminder 3"       );
trans.set("iban",         "IBAN"             );
trans.set("bic",          "BIC"              );

trans.set("owner",        "Owner"            );
trans.set("articles",     "Articles"         );
trans.set("animals",      "Animals"          );
trans.set("dead animals", "Dead Animals"     );

//live search
trans.set("live search result animal", "Animals");
trans.set("live search result animal-d", "Dead Animals");
trans.set("live search result article", "Articles");
trans.set("live search result owner", "Owner");

//treatment department
trans.set("next treatment", "next treatment");
trans.set("later treatment", "later treatment");
trans.set("user", "User");
