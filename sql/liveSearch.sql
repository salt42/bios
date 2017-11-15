--#run
CREATE VIRTUAL TABLE IF NOT EXISTS OwnerSearch USING FTS5(id, name, name_2, first_name, first_name_2, address, zip, city, address_2, zip_2, city_2);
--#run
INSERT INTO OwnerSearch
  SELECT id, name, name_2, first_name, first_name_2, address, zip, city, address_2, zip_2, city_2
  FROM owner;

--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY rank;

--#run
DROP TABLE OwnerSearch;