--#all
SELECT *
    FROM AnimalSearch
    WHERE AnimalSearch
    MATCH @query
    ORDER BY RANK;
--#all
SELECT *
    FROM animal
    WHERE id = @query
    ORDER BY RANK;
--#all
SELECT *
    FROM animal
    WHERE name
    MATCH @query
    ORDER BY RANK;