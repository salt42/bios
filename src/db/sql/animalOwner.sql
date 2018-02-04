--#all
SELECT *
    FROM animal_owner
    WHERE animal = @query;
--#all
SELECT *
    FROM animal_owner
    WHERE owner = @query;
--#all
SELECT first_name, name, cave, gender
    FROM owner
    WHERE id = @query;
--#all
SELECT name, died, species_id, birthday
    FROM animal
    WHERE id = @query;
--#all
SELECT *
FROM weight
    WHERE animal_id = @query;