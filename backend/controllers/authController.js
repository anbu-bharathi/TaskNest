const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET = process.env.JWT_SECRET || "secretkey";

exports.registerUser = async (req,res) => {
    try {
        const { username,email,password,role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Email already registered" });

        const hashedPass = await bcrypt.hash(password,10);
        const user = await User.create({ username,email,password: hashedPass,role });

        res.status(201).json({ msg: "User registered successfully",user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error during registration" });

    }
};

exports.loginUser = async (req,res) => {
    try {
        const { email,password,role } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.role !== role) {
            return res.status(401).json({ msg: "Invalid credentials or role" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

        const token = jwt.sign({ userId: user._id,role: user.role,username: user.username },SECRET,{ expiresIn: "2h" });
        
        res.json({ token,user: { username: user.username,role: user.role,email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Login failed" });
    }
};

