require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "default_secret_key";

exports.authenticateAdmin = (req,res,next) =>{
    let loggedinUser = req?.session?.user || null;
    if(!loggedinUser){
        return res.status(401).json({
            message: "Unauthorized",

        })

    }
     if(req?.session?.user?.role !== "admin") {
        return res.status(403).json({ msg: "Forbidden : you don't have access" });
    }
    next();
}

exports.authenticate1 = (req,res,next) => {
    console.log(req?.session?.userId,req?.session?.user);
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

