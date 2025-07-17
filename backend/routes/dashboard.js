const express = require('express');
const app = express.Router();
const path = require('path');
const frontendData = require('../dataModels/frontend-data');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "fronend", "index.html"));
});


app.get('/images', (req, res) => {
    const imgName = req.query.name;
    res.sendFile(path.join(__dirname, "..", "..", "fronend", "images", imgName));
});


app.get('/api/navbar', (req, res) => {
    res.json(frontendData);
});

module.exports = app;