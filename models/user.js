const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jst = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    userID: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    },
    password: {
        type: String,
        default: "",
    },
    userType: {
        type: String,
        default: "user",
        enum: ["user","moderator","admin"]
    }
})

module.exports = new mongoose.model("User", UserSchema)