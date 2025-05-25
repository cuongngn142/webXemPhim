const movieModel = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHighRatedMovies = async (req, res) => {
  try {
    const movies = await movieModel.getHighRatedMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMovies,
  getHighRatedMovies,
};
