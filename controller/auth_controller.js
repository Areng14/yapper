const bcrypt = require("bcryptjs")
const UserModel = require('../models/user')
const crypto = require('crypto')
const { generateToken } = require("../middleware/auth")

const userRegister = async (userDetails, res) => {
    const { password,username } = userDetails

    const checkUser = await UserModel.findOne({username:username})
    if (checkUser) {
        return res.status(500).json({success:false, message: "username taken"})
    }
    
    const hashPass = await bcrypt.hash(password, 12)

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

    const token = generateToken(checkUsername.userID);
    res.cookie('jwt', token)

    return res.status(200).json({success:true, message: "Login OK",data: "Bearer " + token})
}

const getUserDetailById = async ( userId, res ) => {
    const user = await UserModel.findOne({userID: userId})
    if (!user) {
        return res.status(404).json({success:false,message: "User not found."})
    }
    return res.status(200).json({success:true, message: "get data OK",data: user})
}

const getAllUsers = async ( req, res ) => {
    const userId2 = req.user.userID
    const user_list = await UserModel.find({})
    if (user_list.length == 0) {
        return res.status(200).json({success:false,message: "No users."})
    }
    const filtered = user_list.filter((item) => item.userID != userId2)
    return res.status(200).json({success:true, message: "get data OK", total: filtered.length, data: filtered})
}

module.exports = {
    userRegister,
    login,
    getUserDetailById,
    getAllUsers
}