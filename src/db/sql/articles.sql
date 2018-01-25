--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY rank;

