const router = require("express").Router()
const { userRegister } = require("../controller/auth_controller")

router.post('/api/register', (req, res) => {
    userRegister(req.body,res)
})

module.exports = router