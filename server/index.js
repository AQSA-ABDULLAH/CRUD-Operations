const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const userRoutes = require('./routes/users.js');

// Load Routes
app.use('/api/user', userRoutes);

// Cors
app.use(cors());

// Connection to MongoDB
require('./db/connection.js');

// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});