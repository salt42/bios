--#all
SELECT *
    FROM animal_owner
    WHERE owner = @query;
--#all
SELECT *
    FROM animal_owner
    WHERE animal = @query;
--#all
SELECT id, first_name, name, cave, gender
    FROM owner
    WHERE id = @query;
--#all
SELECT id, name, died, species_id, birthday
    FROM animal
    WHERE id = @query;
--#all
SELECT *
    FROM treatment
    WHERE animal_id = @query;