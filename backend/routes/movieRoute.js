const movieController = require("../controllers/movieController");
const express = require("express");
const router = express.Router();

router.get("/api/movies", movieController.getAllMovies);
router.get("/api/movies/high-rated", movieController.getHighRatedMovies);
module.exports = router;
