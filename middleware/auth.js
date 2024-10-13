const jwt = require("jsonwebtoken")
const { SECRET } = require('../config/db')
require("dotenv").config()

const SECRET_KEY = process.env.SECRET

const generateToken = (userId) => {
    return jwt.sign({id:userId}, SECRET_KEY, {expiresIn:"7d"})
}

module.exports = { generateToken }