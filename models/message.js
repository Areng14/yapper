const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jst = require("jsonwebtoken")

const MsgSchema = new mongoose.Schema({
    sender: {
        type: String,
        require: true
    },
    reciver: {
        type: String,
        require: true
    },
    content: {
        type: JSON,
        require: true
    },
    time: {
        type: String,
        require: true
    },
})

module.exports = new mongoose.model("msg", MsgSchema)