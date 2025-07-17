
const userModel = require("../models/userModel");

const signupValidation = async (req,res,next) => {
	try {
		const { username,email,password,role } = req.body;

		if (!username || !email || !password || !role) {
			return res.status(400).json({
				success: false,
				message: "All fields (username, email, password, role) are required."
			});
		}


		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: "Invalid email format."
			});
		}


		try {
			const existingUser = await userModel.findOne({ email });
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: "Email already exists. Please use a different one."
				});
			}
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Error checking existing user email."
			});
		}


		if (password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 6 characters long."
			});
		}

		const validRoles = ["admin","member"];
		if (!validRoles.includes(role.toLowerCase())) {
			return res.status(400).json({
				success: false,
				message: "Role must be either 'admin' or 'member'."
			});
		}

		next();
	} catch (err) {
		console.log(err.message);
		next(err);
	}
};

module.exports = signupValidation;
