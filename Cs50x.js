// Soal-1
SELECT title FROM movies WHERE year = 2008;

// Soal-2
SELECT birth AS EmmaStoneBirthYear FROM people WHERE name = 'Emma Stone';

// Soal-3
SELECT title FROM movies WHERE year > 2017 ORDER BY title;

// Soal-4
SELECT COUNT(*) AS Movies_With_10_Rating FROM movies AS m JOIN
ratings AS r ON m.id = r.movie_id
WHERE r.rating = 10;