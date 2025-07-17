
const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while fetching users." });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user)
            return res.status(404).json({ success: false, message: "User not found." });
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while fetching the user." });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const newUser = new userModel({
            username,
            email,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully!", data: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while creating user." });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ success: false, message: "User not found." });

        res.json({ success: true, message: "User updated successfully!", data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while updating user." });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "User not found." });

        res.json({ success: true, message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error while deleting user." });
    }
}; 