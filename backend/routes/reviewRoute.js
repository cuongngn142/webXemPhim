const reviewController = require("../controllers/reviewController");
const express = require("express");
const router = express.Router();

router.get("/api/reviews", reviewController.getAllReview);
router.post("/api/review", reviewController.addReview);
module.exports = router;
