const router = require("express").Router()
const { getAllMessage } = require('../controller/msg_controller')

router.get('/message', (res,req) => {
    const {sendID, reciveID} = req.query
    getAllMessage({sendID, reciveID})
})

module.exports = router