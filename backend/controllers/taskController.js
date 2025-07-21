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