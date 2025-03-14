const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "club_head", "admin"],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
