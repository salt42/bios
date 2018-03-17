window.translationData = new Map();

let helper;
//information
translationData.set("bios_language", "en_en");

//Enums
helper = "GENDER";
let i = 0;
translationData.set(helper + "_" + i++, "male"    );
translationData.set(helper + "_" + i++, "female"  );
translationData.set(helper + "_" + i++, "unknown" );

helper = "SPECIES";
i = 1;
translationData.set(helper + "_" + i++, "dog"     );
translationData.set(helper + "_" + i++, "cat"     );
translationData.set(helper + "_" + i++, "bird"    );
translationData.set(helper + "_" + i++, "rodent"  );
translationData.set(helper + "_" + i++, "turtle"  );
translationData.set(helper + "_" + i++, "horse"   );
translationData.set(helper + "_" + i++, "cow"     );
translationData.set(helper + "_" + i++, "pig"     );
translationData.set(helper + "_" + i++, "deer"    );
translationData.set(helper + "_" + i++, "unknown" );
translationData.set(helper + "_" + i++, "calf"    );

//core trans
translationData.set("liveSearch placeholder",     "Search..."         );


translationData.set("owner_id",     "owner ID"         );
translationData.set("first_name",   "first name"       );
translationData.set("name",         "name"             );
translationData.set("salutation_2", "salutation 2"     );
translationData.set("first_name_2", "first name 2"     );
translationData.set("name_2",       "name 2"           );
translationData.set("address_2",    "address 2"        );
translationData.set("zip_2",        "zip 2"            );
translationData.set("city_2",       "city 2"           );
translationData.set("country_",     "country 2"        );
translationData.set("telephone_1",  "telephone"        );
translationData.set("telephone_2",  "telephone 2"      );
translationData.set("telephone_3",  "telephone 3"      );
translationData.set("telephone_4",  "telephone 4"      );
translationData.set("e_mail",       "e-Mail"           );
translationData.set("cave",         "CAVE"             );
translationData.set("cave_text",    "CAVE description" );
translationData.set("reminder_1",   "reminder"         );
translationData.set("reminder_2",   "reminder 2"       );
translationData.set("reminder_3",   "reminder 3"       );
translationData.set("iban",         "IBAN"             );
translationData.set("bic",          "BIC"              );

translationData.set("owner",        "Owner"            );
translationData.set("articles",     "Articles"         );
translationData.set("animals",      "Animals"          );
translationData.set("dead animals", "Dead Animals"     );

//live search
translationData.set("live search result animal", "Animals");
translationData.set("live search result animal-d", "Dead Animals");
translationData.set("live search result article", "Articles");
translationData.set("live search result owner", "Owner");

//treatment department
translationData.set("next treatment", "next treatment");
translationData.set("later treatment", "later treatment");
translationData.set("user", "User");
