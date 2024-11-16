const MessageModel = require('../models/message')

const getAllMessage = async (getAllMessageParam, res) => {
    const {sendID, reciveID} = getAllMessageParam
    const msg_list = await MessageModel.find({sender: sendID,  reciver: reciveID})
    return res.json({success: true, data: msg_list})
}

module.exports = getAllMessage