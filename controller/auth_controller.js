const bcrypt = require("bcryptjs")
const jst = require("jsonwebtoken")
const passport = require("passport")
const { SECRET } = require("../config/db")
const { request } = require("express")
const UserModel = require('../models/user')

const userRegister = async (userDetails, res) => {
    const { password } = userDetails
    
    const hashPass = await bcrypt.hash(passport,SECRET)

    const newUser = new UserModel({...userDetails, hashPass})
    await newUser.save()

    return res.status(201).json({data: newUser})
}

module.exports = {
    userRegister
}