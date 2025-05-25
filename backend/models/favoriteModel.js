const db = require("../config/db");

const getAllUserFavoriteMovies = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  SELECT u.UserId, u.Username, m.MovieId, m.Title, f.FavoriteId, f.CreatedAt
  FROM Users u
  JOIN Favorites f ON u.UserId = f.UserId
  JOIN Movies m ON f.MovieId = m.MovieId
`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Lỗi khi JOIN:", err);
        reject(err);
      } else {
        const ResultMap = [];
        for (const row of rows) {
          if (!ResultMap[row.UserId]) {
            ResultMap[row.UserId] = {
              UserId: row.UserId,
              Username: row.Username,
              Favorites: [],
            };
          }
          if (row.FavoriteId) {
            ResultMap[row.UserId].Favorites.push({
              MovieId: row.MovieId,
              Title: row.Title,
              FavoriteId: row.FavoriteId,
              CreatedAt: row.CreatedAt,
            });
          }
        }
        resolve(Object.values(ResultMap));
      }
    });
  });
};

const addUserFavoriteMovie = (UserId, MovieId) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO 
    Favorites(UserId, MovieId, CreatedAt) 
    VALUES(?, ?, datetime('now'))`;
    db.run(insertQuery, [UserId, MovieId], function (err) {
      if (err) return reject(err);
      const FavoriteId = this.lastID;
      resolve(FavoriteId);
    });
  });
};

const getUserFavoriteMovieByUserId = (UserId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT m.MovieId, m.Title, f.FavoriteId, f.CreatedAt
      FROM Favorites f
      JOIN Movies m ON f.MovieId = m.MovieId
      WHERE f.UserId = ?
    `;
    db.all(sql, [UserId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = {
  getAllUserFavoriteMovies,
  getUserFavoriteMovieByUserId,
  addUserFavoriteMovie,
};

/*
| Viết tắt     | Tên đầy đủ         | Ý nghĩa chính                                           |
| ------------ | ------------------ | ------------------------------------------------------- |
| `JOIN`       | `INNER JOIN`       | Chỉ lấy bản ghi **khớp ở cả 2 bảng**                    |
| `LEFT JOIN`  | `LEFT OUTER JOIN`  | Lấy tất cả bên trái, bên phải thì `NULL` nếu không khớp |
| `RIGHT JOIN` | `RIGHT OUTER JOIN` | (Không có trong SQLite)                                 |
| `FULL JOIN`  | `FULL OUTER JOIN`  | (Không có trong SQLite)                                 |
| `CROSS JOIN` |                    | Tổ hợp **mọi bản ghi** giữa 2 bảng                      |
| `SELF JOIN`  |                    | JOIN chính bảng đó với chính nó                         |
*/
