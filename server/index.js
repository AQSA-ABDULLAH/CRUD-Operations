const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connection to MongoDB
require('./db/connection.js');

// Routes
const userRoutes = require('./routes/users.js');

// Load Routes
app.use('/api/user', userRoutes);

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
