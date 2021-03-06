--#run
CREATE VIRTUAL TABLE IF NOT EXISTS AnimalSearch USING FTS5(id, species_id, race_id, chip, tattoo, name, birthday, color_description, died_on, died);

--#run
CREATE VIRTUAL TABLE IF NOT EXISTS ArticleSearch USING FTS5(id, name);

--#run
CREATE VIRTUAL TABLE IF NOT EXISTS OwnerSearch USING FTS5(id, name, name_2, first_name, first_name_2, address, zip, city, address_2, zip_2, city_2);

--#run
INSERT INTO AnimalSearch
  SELECT id, species_id, race_id, chip, tattoo, name, birthday, color_description, died_on, died
  FROM animal;
--#run
INSERT INTO ArticleSearch
  SELECT id, name
  FROM articles;
--#run
INSERT INTO OwnerSearch
  SELECT id, name, name_2, first_name, first_name_2, address, zip, city, address_2, zip_2, city_2
  FROM owner;

--   --#run
--   INSERT INTO animal_owner
--   SELECT id, owner_id
--   FROM animal;
--   this expression is used to create the animal_owner hashtable after importing old data