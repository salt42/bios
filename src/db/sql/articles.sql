--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY RANK;
--#all
SELECT *
    FROM articles
    WHERE id = @query
    ORDER BY RANK;
--#all
SELECT *
    FROM articles
    WHERE name
    MATCH @query
    ORDER BY RANK;

