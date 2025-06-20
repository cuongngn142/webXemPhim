const db = require("../config/db");

const getEpisodesByMovieId = (movieId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM Episodes WHERE MovieId = ? ORDER BY EpisodeNumber ASC",
      [movieId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

const addEpisode = (episodeData) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Episodes (MovieId, EpisodeNumber, Title, VideoUrl, Duration, CreatedAt)
   VALUES (?, ?, ?, ?, ?, ?)`,
      [
        episodeData.MovieId,
        episodeData.EpisodeNumber,
        episodeData.Title,
        episodeData.VideoUrl,
        episodeData.Duration,
        new Date().toISOString(),
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ EpisodeId: this.lastID });
      }
    );
  });
};

const updateEpisode = (episodeId, episodeData) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Episodes SET Title = ?, VideoUrl = ?, EpisodeNumber = ? WHERE EpisodeId = ?`,
      [
        episodeData.Title,
        episodeData.VideoUrl,
        episodeData.EpisodeNumber,
        episodeId,
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

const deleteEpisode = (episodeId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM Episodes WHERE EpisodeId = ?",
      [episodeId],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

module.exports = {
  getEpisodesByMovieId,
  addEpisode,
  updateEpisode,
  deleteEpisode,
};
