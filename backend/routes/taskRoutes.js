const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const taskController = require("../controllers/taskController");
const taskValidator = require("../middleware/taskvalidation");

router.get("/getalltasks", taskController.getAllTasks);
router.get("/gettask/:id", taskController.getTaskById);
router.post("/createtask", upload.single("attachment"), taskController.createTask);
router.put("/updatetask/:id", taskController.updateTask);
router.delete("/deletetask/:id", taskController.deleteTask);

module.exports = router;


