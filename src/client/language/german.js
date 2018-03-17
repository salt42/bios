window.translationData = new Map();

let helper;
//information
translationData.set("bios_language", "de_de");

//Enums
helper = "GENDER";
let i = 0;
translationData.set(helper + "_" + i++, "männlich"  );
translationData.set(helper + "_" + i++, "weiblich"  );
translationData.set(helper + "_" + i++, "unbekannt" );

helper = "SPECIES";
i = 0;
translationData.set(helper + "_" + i++, "Hund"        );
translationData.set(helper + "_" + i++, "Katze"       );
translationData.set(helper + "_" + i++, "Vogel"       );
translationData.set(helper + "_" + i++, "Nagetier"    );
translationData.set(helper + "_" + i++, "Schildkröte" );
translationData.set(helper + "_" + i++, "Pferd"       );
translationData.set(helper + "_" + i++, "Rind"        );
translationData.set(helper + "_" + i++, "Schwein"     );
translationData.set(helper + "_" + i++, "Wild"        );
translationData.set(helper + "_" + i++, "unbekannt"   );
translationData.set(helper + "_" + i++, "Kalb"        );

translationData.set("unknown",       "unbekannt"         );
translationData.set("years",         "Jahre"             );

// translations default in lowercase !!!
translationData.set("gender",       "geschlecht"          );
translationData.set("first name",   "Vorname"             );
translationData.set("died on",      "verstorben am"       );
translationData.set("owner_id",     "Besitzer ID"         );
translationData.set("salutation",   "Anrede"              );
translationData.set("first_name",   "Vorname"             );
translationData.set("name",         "Name"                );
translationData.set("gender",       "Geschlecht"          );
translationData.set("address",      "Adresse"             );
translationData.set("zip",          "PLZ"                 );
translationData.set("City",         "Stadt"               );
translationData.set("country",      "Land"                );
translationData.set("salutation_2", "Anrede 2"            );
translationData.set("first_name_2", "Vorname 2"           );
translationData.set("name_2",       "Name 2"              );
translationData.set("address_2",    "Adresse 2"           );
translationData.set("Zip_2",        "PLZ 2"               );
translationData.set("City_2",       "Stadt 2"             );
translationData.set("country_2",    "Land 2"              );
translationData.set("telephone_1",  "Telefon"             );
translationData.set("telephone_2",  "Telefon 2"           );
translationData.set("telephone_3",  "Telefon 3"           );
translationData.set("telephone_4",  "Telefon 4"           );
translationData.set("e_mail",       "e-Mail"              );
translationData.set("www",          "www"                 );
translationData.set("comments",     "Bemerkungen"         );
translationData.set("cave",         "CAVE"                );
translationData.set("cave_text",    "CAVE Beschreibung"   );
translationData.set("debit",        "Einzugsermächtigung" );
translationData.set("reminder_1",   "Erinnerung"          );
translationData.set("reminder_2",   "Erinnerung 2"        );
translationData.set("reminder_3",   "Erinnerung 3"        );
translationData.set("encashment",   "Inkasso"             );
translationData.set("iban",         "IBAN"                );
translationData.set("bic",          "BIC"                 );

translationData.set("owner",        "Besitzer"            );
translationData.set("articles",     "Artikel"             );
translationData.set("animals",      "Tiere"               );
translationData.set("dead animals", "tote Tiere"          );
