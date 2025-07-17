const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController");
const signupValidation = require('../middleware/signupValidation');

router.get("/getallusers", signupController.getAllUsers);
router.get("/getuser/:id", signupController.getUserById);
router.post("/adduser",signupValidation, signupController.addUser);
router.put("/updateuser/:id", signupController.updateUser);
router.delete("/deleteuser/:id", signupController.deleteUser);

module.exports = router;