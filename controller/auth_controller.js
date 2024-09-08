const bcrypt = require("bcryptjs")
const { SECRET } = require("../config/db")
const { request } = require("express")
const UserModel = require('../models/user')

const userRegister = async (userDetails, res) => {
    const { password,username } = userDetails

    const checkUser = await UserModel.findOne({username:username})
    if (checkUser) {
        return res.status(500).json({success:false, message: "username taken"})
    }
    
    const hashPass = await bcrypt.hash(password, SECRET)

    const userID = crypto.randomUUID()
    const newUser = new UserModel({...userDetails, password: hashPass, userID: userID})
    await newUser.save()

    return res.status(201).json({data: newUser})
}

const login = async (loginBody,res) => {
    const { username, password } = loginBody

    const checkUsername = await UserModel.findOne({username:username})
    if (!checkUsername) {
        return res.status(404).json({success:false,message: "Username not found."})
    }

    const isMatch = await bcrypt.compare(password, checkUsername.password)
    if (!isMatch) {
        return res.status(400).json({success:false, message: "Incorrect Password."})
    }

    return res.status(400).json({success:true, message: "Logging in..."})
}

module.exports = {
    userRegister,
    login
}