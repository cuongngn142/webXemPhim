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

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await movieModel.getMovieById(id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await movieModel.deleteMovie(id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await movieModel.updateMovie(id, updatedData);

    res.json({
      message: "Movie updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const {
      Title,
      Description,
      PosterUrl,
      BackdropUrl,
      ReleaseYear,
      Director,
      Cast,
      Rating,
      Language,
      Country,
      MovieTypeId,
      CategoryIds,
    } = req.body;

    if (!Title || !ReleaseYear || !MovieTypeId) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const result = await movieModel.addMovie({
      Title,
      Description,
      PosterUrl,
      BackdropUrl,
      ReleaseYear,
      Director,
      Cast,
      Rating,
      Language,
      Country,
      MovieTypeId,
      CategoryIds,
    });

    res
      .status(201)
      .json({ message: "Thêm phim thành công", MovieId: result.MovieId });
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi thêm phim mới" });
  }
};

const updateMovieCategories = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { CategoryIds } = req.body;
    if (!Array.isArray(CategoryIds)) {
      return res.status(400).json({ error: "CategoryIds phải là mảng!" });
    }
    await movieModel.updateMovieCategories(movieId, CategoryIds);
    res.json({ message: "Cập nhật thể loại phim thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
