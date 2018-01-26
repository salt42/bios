--#all
SELECT *
    FROM AnimalSearch
    WHERE AnimalSearch
    MATCH @query
    ORDER BY RANK;

--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY RANK;

--#all
SELECT *
    FROM OwnerSearch
    WHERE OwnerSearch
    MATCH @query
    ORDER BY RANK;


