const express = require("express");
const loginUser = require("../controllers/loginController");
// const registerUser = require("../controllers/signupController");
const isAuthenticated = require("../middleware/newAuthValidation");
const router = express.Router();
// router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;


