--#all
SELECT *
    FROM AnimalSearch
    WHERE AnimalSearch
    MATCH @query
    ORDER BY rank;

--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY rank;

--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY rank;


