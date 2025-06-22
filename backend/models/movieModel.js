const db = require("../config/db");

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        m.*, 
        c.CategoryId, 
        c.Name AS CategoryName
      FROM Movies m
      LEFT JOIN MovieCategories mc ON m.MovieId = mc.MovieId
      LEFT JOIN Categories c ON mc.CategoryId = c.CategoryId
    `;

    /*rows: là mảng kết quả trả về (dạng bảng phẳng - flat table)
    Ví dụ: nếu 1 phim có 3 thể loại → sẽ có 3 dòng giống nhau, chỉ khác thể loại. */
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Lỗi khi JOIN:", err);
        return reject(err);
      }

      const movieMap = {};

      for (const row of rows) {
        if (!movieMap[row.MovieId]) {
          movieMap[row.MovieId] = {
            MovieId: row.MovieId,
            Title: row.Title,
            Description: row.Description,
            PosterUrl: row.PosterUrl,
            BackdropUrl: row.BackdropUrl,
            Views: row.Views,
            CreatedAt: row.CreatedAt,
            ReleaseYear: row.ReleaseYear,
            Director: row.Director,
            Cast: row.Cast,
            Rating: row.Rating,
            Language: row.Language,
            Country: row.Country,
            MovieTypeId: row.MovieTypeId,
            Categories: [],
          };
        }

        if (row.CategoryId) {
          movieMap[row.MovieId].Categories.push({
            CategoryId: row.CategoryId,
            Name: row.CategoryName,
          });
        }
      }

      resolve(Object.values(movieMap));
      /*{
      từ
        1: { MovieId: 1, Title: "Inception", ..., Categories: [{CategoryId: 10, Name: "Sci-Fi"}, ...] },
        2: { MovieId: 2, Title: "Titanic", ..., Categories: [] },
        // ...
      }

      thành
      [
        { MovieId: 1, Title: "Inception", ..., Categories: [...] },
        { MovieId: 2, Title: "Titanic", ..., Categories: [] },
        // ...
      ]
      */
    });
  });
};

const getHighRatedMovies = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Movies WHERE Rating >= 7.5", [], (err, rows) => {
      if (err) {
        console.error("Lỗi khi truy vấn dữ liệu:", err);
        return reject(err);
      } else {
        console.log("Dữ liệu trả về:", rows);
        resolve(rows);
      }
    });
  });
};

const getMovieById = (MovieId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        m.MovieId, m.Title AS MovieTitle, m.Description, m.PosterUrl, m.BackdropUrl, m.Views,
        m.ReleaseYear, m.Director, m.Cast, m.Rating, m.Language, m.Country, m.MovieTypeId,
        e.EpisodeNumber, e.Title AS EpisodeTitle, e.VideoUrl, e.Duration,
        c.CategoryId, c.Name AS CategoryName
      FROM Movies m
      LEFT JOIN MovieCategories mc ON m.MovieId = mc.MovieId
      LEFT JOIN Categories c ON mc.CategoryId = c.CategoryId
      LEFT JOIN Episodes e ON m.MovieId = e.MovieId
      WHERE m.MovieId = ?
    `;

    db.all(sql, [MovieId], (err, rows) => {
      if (err) {
        console.error("Lỗi khi JOIN:", err);
        return reject(err);
      }

      if (!rows || rows.length === 0) return resolve(null);

      const movie = {
        MovieId: rows[0].MovieId,
        Title: rows[0].MovieTitle,
        Description: rows[0].Description,
        PosterUrl: rows[0].PosterUrl,
        BackdropUrl: rows[0].BackdropUrl,
        Views: rows[0].Views,
        ReleaseYear: rows[0].ReleaseYear,
        Director: rows[0].Director,
        Cast: rows[0].Cast,
        Rating: rows[0].Rating,
        Language: rows[0].Language,
        Country: rows[0].Country,
        MovieTypeId: rows[0].MovieTypeId,
        Episodes: [],
        Categories: [],
      };

      for (const row of rows) {
        if (
          row.EpisodeNumber !== null &&
          !movie.Episodes.find((ep) => ep.EpisodeNumber === row.EpisodeNumber)
        ) {
          movie.Episodes.push({
            EpisodeNumber: row.EpisodeNumber,
            Title: row.EpisodeTitle,
            VideoUrl: row.VideoUrl,
            Duration: row.Duration,
          });
        }

        if (
          row.CategoryId !== null &&
          !movie.Categories.find((cat) => cat.CategoryId === row.CategoryId)
        ) {
          movie.Categories.push({
            CategoryId: row.CategoryId,
            Name: row.CategoryName,
          });
        }
      }

      resolve(movie);
    });
  });
};

const deleteMovie = (MovieId) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM Movies WHERE MovieId = ?;`;
    db.run(deleteQuery, [MovieId], function (err) {
      if (err) return reject(err);
      const FavoriteId = this.changes;
      resolve(FavoriteId);
    });
  });
};

const updateMovie = (MovieId, updatedData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Movies 
      SET Title = ?, Description = ?, PosterUrl = ?, BackdropUrl = ?, 
          ReleaseYear = ?, Director = ?, Cast = ?, Rating = ?, 
          Language = ?, Country = ?, MovieTypeId = ?
      WHERE MovieId = ?
    `;

    const params = [
      updatedData.Title,
      updatedData.Description,
      updatedData.PosterUrl,
      updatedData.BackdropUrl,
      updatedData.ReleaseYear,
      updatedData.Director,
      updatedData.Cast,
      updatedData.Rating,
      updatedData.Language,
      updatedData.Country,
      updatedData.MovieTypeId,
      MovieId,
    ];

    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ affectedRows: this.changes });
    });
  });
};

const addMovie = (movieData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Movies 
        (Title, Description, PosterUrl, BackdropUrl, Views, CreatedAt, ReleaseYear, 
         Director, Cast, Rating, Language, Country, MovieTypeId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      movieData.Title,
      movieData.Description,
      movieData.PosterUrl,
      movieData.BackdropUrl,
      0,
      new Date().toISOString(),
      movieData.ReleaseYear,
      movieData.Director,
      movieData.Cast,
      movieData.Rating,
      movieData.Language,
      movieData.Country,
      movieData.MovieTypeId,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        console.error("Lỗi khi thêm phim mới:", err);
        return reject(err);
      }

      const newMovieId = this.lastID;

      // Sửa đoạn này để đảm bảo CategoryIds luôn là mảng số
      let categoryIds = movieData.CategoryIds;
      if (typeof categoryIds === "string") {
        categoryIds = categoryIds
          .split(",")
          .map((id) => Number(id.trim()))
          .filter(Boolean);
      }
      if (!Array.isArray(categoryIds)) categoryIds = [];

      if (categoryIds.length > 0) {
        const insertCategorySql = `
          INSERT INTO MovieCategories (MovieId, CategoryId) VALUES (?, ?)
        `;
        const insertTasks = categoryIds.map((catId) => {
          return new Promise((res, rej) => {
            db.run(insertCategorySql, [newMovieId, catId], (err) => {
              if (err) return rej(err);
              res();
            });
          });
        });

        Promise.all(insertTasks)
          .then(() => resolve({ MovieId: newMovieId }))
          .catch(reject);
      } else {
        resolve({ MovieId: newMovieId });
      }
    });
  });
};

const updateMovieCategories = (movieId, categoryIds) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM MovieCategories WHERE MovieId = ?",
      [movieId],
      function (err) {
        if (err) return reject(err);

        if (!Array.isArray(categoryIds) || categoryIds.length === 0)
          return resolve();

        // Thêm lại các thể loại mới
        const insertSql =
          "INSERT INTO MovieCategories (MovieId, CategoryId) VALUES (?, ?)";
        const tasks = categoryIds.map((catId) => {
          return new Promise((res, rej) => {
            db.run(insertSql, [movieId, catId], (err) => {
              if (err) return rej(err);
              res();
            });
          });
        });

        Promise.all(tasks)
          .then(() => resolve())
          .catch(reject);
      }
    );
  });
};

module.exports = {
  getAllMovies,
  getHighRatedMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
  addMovie,
  updateMovieCategories,
};
