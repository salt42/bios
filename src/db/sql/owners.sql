--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY rank;


