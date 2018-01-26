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
    ORDER BY RANK;
--#all
SELECT *
    FROM owner
    WHERE name
    MATCH @query
    ORDER BY RANK;


