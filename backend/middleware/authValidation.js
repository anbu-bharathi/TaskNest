require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "default_secret_key";

exports.authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
    }
};

//allow only admin users
exports.authorizeadmin = (req,res,next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Forbidden: admins only" });
    }
    next();
};