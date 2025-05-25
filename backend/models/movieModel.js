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
    const sql = `SELECT MovieId FROM Movies WHERE MovieId = ?`;
    db.get(sql, [MovieId], (err, row) => {
      if (err) {
        console.error("Lỗi khi truy vấn dữ liệu:", err);
        return reject(err);
      } else {
        console.log("Dữ liệu trả về:", row);
        resolve(row);
      }
    });
  });
};
module.exports = {
  getAllMovies,
  getHighRatedMovies,
  getMovieById,
};
