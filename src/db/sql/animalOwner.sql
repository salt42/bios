--#all
SELECT *
    FROM animal_owner
    WHERE animal = @query;
--#all
SELECT *
    FROM animal_owner
    WHERE owner = @query;