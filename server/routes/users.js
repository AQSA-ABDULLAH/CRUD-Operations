const express = require('express');
const { UserController } = require('../controllers/UserController'); 
const router = express.Router();
require("../db/connection");

// PUBLIC ROUTES
router.post("/create-user", UserController.userRegistration);
router.get("/get-users", UserController.getAllUsers);
router.get("/get-user-by-id/:id", UserController.getUserId);
router.patch("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;