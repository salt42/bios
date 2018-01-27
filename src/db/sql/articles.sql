--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY RANK;
--#all
SELECT *
    FROM ArticleSearch
    WHERE id = @query
    ORDER BY name;
--#all
SELECT *
    FROM ArticleSearch
    WHERE ArticleSearch
    MATCH @query
    ORDER BY name;

