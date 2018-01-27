--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY RANK;
--#all
SELECT *
    FROM owner
    WHERE id = @query
    ORDER BY name;
--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY name;


