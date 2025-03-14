const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/authController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",protect,currentUser);

module.exports = router;
