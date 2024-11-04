const User = require("../models/Users");
const mongoose = require('mongoose');

class UserController {

    // USER REGISTRATION
    static userRegistration = async (req, res) => {
        try {
            const { userName, email, age } = req.body;

            if (!email || !age || !userName) {
                return res.status(400).json({ error: "Please fill in all fields properly" });
            }

            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({ error: "User already exists" });
            }

            const user = new User({ userName, email, age });

            try {
                const savedUser = await user.save();
                return res.status(201).json({
                    status: "success",
                    message: "User created successfully",
                });
            } catch (error) {
                console.error("Failed to send Create User email:", error);
                return res.status(500).json({ error: "Failed to send Create User email." });
            }
        } catch (error) {
            console.error("Error in user registration:", error.message);
            return res.status(500).json({ error: "Failed to register user." });
        }
    };

    // GET all users
    static async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json({ status: "success", data: users });
        } catch (error) {
            res.status(500).json({ status: "failed", message: "Failed to get users" });
        }
    }

    // GET a single user by ID
    static async getUserId(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: "error", message: `Invalid profile ID: ${id}` });
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ status: "error", message: `No user found with ID: ${id}` });
            }
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ status: "error", message: "Failed to retrieve user data", error: error.message });
        }
    }

    // UPDATE user
    static async updateUser(req, res) {
        console.log("Update user route hit");
        const { id } = req.params;
        const { userName, email, age } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ status: "failed", message: `Invalid user ID: ${id}` });
        }

        const updatedUser = { userName, email, age };

        try {
            const updatedData = await User.findByIdAndUpdate(id, updatedUser, { new: true });

            if (!updatedData) {
                return res.status(404).send({ status: "failed", message: `No user found with ID: ${id}` });
            }

            res.status(200).send({ status: "success", message: "User data updated successfully", data: updatedData });
        } catch (error) {
            console.error("Error updating user data:", error);
            res.status(500).send({ status: "failed", message: "Failed to update user data" });
        }
    }

    // DELETE user
    static async deleteUser(req, res) {
        console.log("Delete user route hit");
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ status: "failed", message: `Invalid user ID: ${id}` });
        }

        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).send({ status: "failed", message: `No user found with ID: ${id}` });
            }

            res.status(200).send({ status: "success", message: "User deleted successfully", data: deletedUser });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send({ status: "failed", message: "Failed to delete user" });
        }
    }
}

module.exports = { UserController };