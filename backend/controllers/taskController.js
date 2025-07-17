// const fs = require("fs").promises;
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const tasksFile = path.join(__dirname, "../data/tasks.json");

// async function readTasks() {
//     try {
//         const data = await fs.readFile(tasksFile, "utf-8");
//         return JSON.parse(data || "[]");
//     } catch (err) {
//         console.error("Error reading tasks.json:", err);
//         return [];
//     }
// }

// async function writeTasks(tasks) {
//     try {
//         await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), "utf-8");
//     } catch (err) {
//         console.error("Error writing to tasks.json:", err);
//         throw err;
//     }
// }

// exports.getAllTasks = async (req, res) => {
//     try {
//         const tasks = await readTasks();
//         res.json({ success: true, data: tasks });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error while fetching tasks." });
//     }
// };

// exports.getTaskById = async (req, res) => {
//     try {
//         const tasks = await readTasks();
//         const task = tasks.find(t => t.id === req.params.id);
//         if (!task)
//             return res.status(404).json({ success: false, message: "Task not found." });
//         res.json({ success: true, data: task });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error while fetching the task." });
//     }
// };

// exports.createTask = async (req, res) => {
//     try {
//         const { taskName, taskDesc, dueDate, prior, teamMem } = req.body;

//         if (!taskName || !taskDesc || !dueDate || !prior || !teamMem) {
//             return res.status(400).json({ success: false, message: "All fields are required." });
//         }

//         const newTask = {
//             id: uuidv4(),
//             taskName,
//             taskDesc,
//             dueDate,
//             prior,
//             teamMem,
//             attachment: req.file ? req.file.filename : null
//         };

//         const tasks = await readTasks();
//         tasks.push(newTask);
//         await writeTasks(tasks);

//         res.status(201).json({ success: true, message: "Task created successfully!", data: newTask });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error while creating task." });
//     }
// };

// exports.updateTask = async (req, res) => {
//     try {
//         const tasks = await readTasks();
//         const index = tasks.findIndex(t => t.id === req.params.id);
//         if (index === -1) 
//             return res.status(404).json({ success: false, message: "Task not found." });

//         tasks[index] = { ...tasks[index], ...req.body };
//         await writeTasks(tasks);
//         res.json({ success: true, message: "Task updated successfully!", data: tasks[index] });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error while updating task." });
//     }
// };

// exports.deleteTask = async (req, res) => {
//     try {
//         const tasks = await readTasks();
//         const updated = tasks.filter(t => t.id !== req.params.id);
//         if (updated.length === tasks.length)
//             return res.status(404).json({ success: false, message: "Task not found." });

//         await writeTasks(updated);
//         res.json({ success: true, message: "Task deleted successfully." });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error while deleting task." });
//     }
// };


const TaskModel = require('../models/formModel');
const { v4: uuidv4 } = require('uuid');
 
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json({ success: true, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while fetching tasks." });
    }
};
 
exports.getTaskById = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id });
        if (!task)
            return res.status(404).json({ success: false, message: "Task not found." });
        res.json({ success: true, data: task });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while fetching the task." });
    }
};
 
exports.createTask = async (req, res) => {
    try {
        const { taskName, taskDesc, dueDate, prior, teamMem } = req.body;
 
        if (!taskName || !taskDesc || !dueDate || !prior || !teamMem) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
 
        const newTask = new TaskModel({
            taskName,
            taskDesc,
            dueDate,
            prior,
            teamMem,
            attachment: req.file ? req.file.filename : null
        });
 
        await newTask.save();
 
        res.status(201).json({ success: true, message: "Task created successfully!", data: newTask });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while creating task." });
    }
};
 
exports.updateTask = async (req, res) => {
    try {
        const updated = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
 
        if (!updated)
            return res.status(404).json({ success: false, message: "Task not found." });
 
        res.json({ success: true, message: "Task updated successfully!", data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while updating task." });
    }
};
 
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await TaskModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Task not found." });
 
        res.json({ success: true, message: "Task deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while deleting task." });
    }
};