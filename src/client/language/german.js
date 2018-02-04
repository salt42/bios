window.trans = new Map();

let helper;

//Enums
helper = "GENDER";
let i = 0;
trans.set(helper + "_" + i++, "männlich"  );
trans.set(helper + "_" + i++, "weiblich"  );
trans.set(helper + "_" + i++, "unbekannt" );

helper = "SPECIES";
i = 0;
trans.set(helper + "_" + i++, "Hund"        );
trans.set(helper + "_" + i++, "Katze"       );
trans.set(helper + "_" + i++, "Vogel"       );
trans.set(helper + "_" + i++, "Nagetier"    );
trans.set(helper + "_" + i++, "Schildkröte" );
trans.set(helper + "_" + i++, "Pferd"       );
trans.set(helper + "_" + i++, "Rind"        );
trans.set(helper + "_" + i++, "Schwein"     );
trans.set(helper + "_" + i++, "Wild"        );
trans.set(helper + "_" + i++, "unbekannt"   );
trans.set(helper + "_" + i++, "Kalb"        );

trans.set("unknown",       "unbekannt"         );
trans.set("years",         "Jahre"             );

// translations default in lowercase !!!
trans.set("gender",       "geschlecht"          );
trans.set("first name",   "Vorname"             );
trans.set("died on",      "verstorben am"       );
trans.set("owner_id",     "Besitzer ID"         );
trans.set("salutation",   "Anrede"              );
trans.set("first_name",   "Vorname"             );
trans.set("name",         "Name"                );
trans.set("gender",       "Geschlecht"          );
trans.set("address",      "Adresse"             );
trans.set("zip",          "PLZ"                 );
trans.set("City",         "Stadt"               );
trans.set("country",      "Land"                );
trans.set("salutation_2", "Anrede 2"            );
trans.set("first_name_2", "Vorname 2"           );
trans.set("name_2",       "Name 2"              );
trans.set("address_2",    "Adresse 2"           );
trans.set("Zip_2",        "PLZ 2"               );
trans.set("City_2",       "Stadt 2"             );
trans.set("country_2",    "Land 2"              );
trans.set("telephone_1",  "Telefon"             );
trans.set("telephone_2",  "Telefon 2"           );
trans.set("telephone_3",  "Telefon 3"           );
trans.set("telephone_4",  "Telefon 4"           );
trans.set("e_mail",       "e-Mail"              );
trans.set("www",          "www"                 );
trans.set("comments",     "Bemerkungen"         );
trans.set("cave",         "CAVE"                );
trans.set("cave_text",    "CAVE Beschreibung"   );
trans.set("debit",        "Einzugsermächtigung" );
trans.set("reminder_1",   "Erinnerung"          );
trans.set("reminder_2",   "Erinnerung 2"        );
trans.set("reminder_3",   "Erinnerung 3"        );
trans.set("encashment",   "Inkasso"             );
trans.set("iban",         "IBAN"                );
trans.set("bic",          "BIC"                 );

trans.set("owner",        "Besitzer"            );
trans.set("articles",     "Artikel"             );
trans.set("animals",      "Tiere"               );
trans.set("dead animals", "tote Tiere"          );
