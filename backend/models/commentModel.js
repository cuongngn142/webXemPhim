const db = require("../config/db");

const getAllComment = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT c.*, u.UserId, u.FullName, m.MovieId, m.Title  FROM Users u 
    JOIN Comments c ON u.UserId = c.UserId 
    JOIN Movies m ON c.MovieId = m.MovieId`;
    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const addComment = (MovieId, UserId, Content, isAnonymous) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Comments(MovieId, UserId, Content, isAnonymous, CreatedAt) VALUES(?, ?, ?, ?, datetime('now'))`;
    db.run(query, [MovieId, UserId, Content, isAnonymous], function (err) {
      if (err) return reject(err);
      const ID = this.lastID;
      resolve(ID);
    });
  });
};

module.exports = {
  getAllComment,
  addComment,
};
