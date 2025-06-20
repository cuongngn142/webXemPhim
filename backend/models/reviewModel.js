const db = require("../config/db");

const getAllReview = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ur.*, u.UserId, u.FullName, m.MovieId, m.Title 
      FROM Users u 
      JOIN UserReviews ur ON u.UserId = ur.UserId 
      JOIN Movies m ON m.MovieId = ur.MovieId`;

    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const addReview = (MovieId, UserId, Rating) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO UserReviews (MovieId, UserId, Rating, CreatedAt)
      VALUES (?, ?, ?, datetime('now'))`;

    db.run(insertQuery, [MovieId, UserId, Rating], function (err) {
      if (err) return reject(err);
      const reviewId = this.lastID;
      resolve(reviewId);
    });
  });
};

module.exports = { getAllReview, addReview };
