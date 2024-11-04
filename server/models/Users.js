const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userName: { type: String, trim: true },
    email: { type: String, trim: true },
    age: { type:Number, trim: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: { type: Date },
});

const User = mongoose.model("users", usersSchema);
module.exports = User;