const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const { authenticate,authorizeadmin } = require("./middleware/authValidation");
const frontendData = require("./dataModels/frontend-data");
const signupRoutes = require("./routes/signupRoutes");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"..","fronend")));

app.set("view engine","jade");
app.set("views",path.join(__dirname,"views"));

app.use("/api/auth",authRoutes);
app.use("/api/v1/tasks",taskRoutes);
app.use("/api/v1/signup",signupRoutes);

app.get("/index",(req,res) => {
    res.render("index.jade",frontendData);
});

app.get("/form",authenticate,authorizeadmin,(req,res) => {
    res.render("form.jade",frontendData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`✅ Server running on http://localhost:${PORT}`));
