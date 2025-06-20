const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.post("/api/register", userController.registerUser);
router.get("/api/users/:userId", userController.getUserById);
router.post("/api/checklogin", userController.checkLogin);
router.put("/api/users/:userId", userController.updateUser);
router.delete("/api/users/:userId", userController.deleteUser);

module.exports = router;
