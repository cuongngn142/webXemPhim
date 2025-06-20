const favoriteController = require("../controllers/favoriteController");
const express = require("express");
const router = express.Router();

router.get("/api/favorites", favoriteController.getAllUserFavoriteMovies);
router.post("/api/addFavorite", favoriteController.addUserFavoriteMovie);
router.get("/api/users/:userId/favorites", favoriteController.getUserFavoriteMovie);
router.delete("/api/deleteFavorite", favoriteController.deleteUserFavoriteMovie);
module.exports = router;

