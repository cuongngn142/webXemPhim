const movieController = require("../controllers/movieController");
const express = require("express");
const router = express.Router();
router.post("/api/movies", movieController.addMovie);
router.get("/api/movies", movieController.getAllMovies);
router.get("/api/movies/high-rated", movieController.getHighRatedMovies);
router.get("/api/movie/:id", movieController.getMovieById);
router.delete("/api/movie/:id", movieController.deleteMovie);
router.put("/api/movie/:id", movieController.updateMovie);
router.put("/api/movies/:id/categories", movieController.updateMovieCategories);

module.exports = router;

/*
| Method | Mục đích                     | Dữ liệu gửi lên                    |
| ------ | ---------------------------- | ---------------------------------- |
| PUT    | Thay thế toàn bộ tài nguyên  | Gửi đầy đủ (toàn bộ)               |
| PATCH  | Cập nhật một phần tài nguyên | Gửi chỉ những trường muốn cập nhật |

*/
