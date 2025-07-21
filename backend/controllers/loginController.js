const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "jwt_secret";

async function loginUser(req,res) {
	const { email,password,role } = req.body;

	try {
		const user = await userModel.findOne({ email: email });

		if (!user) {
			return res.status(401).json({ success: false,message: "User not found" });
		}

		const isPasswordMatch = await bcrypt.compare(password,user.password);

		if (!isPasswordMatch) {
			return res.status(401).json({ success: false,message: "Incorrect password" });
		}

		if (user.role !== role) {
			return res.status(401).json({ success: false,message: "Role mismatch" });
		}

		const token = jwt.sign(
			{
				userRole: user.role,
				userName: user.username
			},
			secretKey,
			{ expiresIn: "2h" }
		);
		 
		req.session.userId = user._id;
		
		res.status(200).json({
			success: true,
			status: 200,
			message: "Login successful",
			result: {
				token,
				userName: user.username,
				userEmail: user.email,
				userRole: user.role,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false,message: "Server error",error: err });
	}
}

module.exports = loginUser;
