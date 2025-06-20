const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episodeController");

router.get(
  "/api/movies/:movieId/episodes",
  episodeController.getEpisodesByMovieId
);
router.post("/api/episodes", episodeController.addEpisode);
router.put("/api/episodes/:episodeId", episodeController.updateEpisode);
router.delete("/api/episodes/:episodeId", episodeController.deleteEpisode);

module.exports = router;
