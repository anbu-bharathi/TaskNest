const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const { authenticateAdmin } = require("./middleware/authValidation");
const frontendData = require("./dataModels/frontend-data");
const signupRoutes = require("./routes/signupRoutes");
const session = require("express-session");
const userModel = require("./models/userModel");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: "tasknest",
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"..","fronend")));

app.set("view engine","jade");
app.set("views",path.join(__dirname,"views"));

app.get("/index",(req,res) => {
    res.render("index.jade",frontendData);
});


app.use("/api/auth",authRoutes);

app.use(async (req,res,next) => {
    if (req?.session?.userId) {
        req.session.user = await userModel.findOne({ _id: req.session.userId }).lean();
        next();
    }
    else {
        return res.status(401).json({ success: false,status: 401,message: "Unauthorized" });
    }
});
app.use("/api/v1/tasks",taskRoutes);
app.use("/api/v1/signup",signupRoutes);




// app.get('/admin-dashboard', authenticate, authorizeadmin, (req, res) => {
//   res.render('adminDashboard', {
//     user: {
//       name: req.user.name || 'Admin'
//     }
//   });
// });

//authenticate,authorizeadmin
app.get("/form",authenticateAdmin,(req,res) => {
    res.render("form.jade",frontendData);
});
    
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`✅ Server running on http://localhost:${PORT}`));
