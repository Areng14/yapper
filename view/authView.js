const router = require("express").Router()
const { userRegister,login } = require("../controller/auth_controller")

router.post('/register', (req, res) => {
    userRegister(req.body,res)
})

router.post('/login', (req, res) => {
    login(req.body,res)
})

module.exports = router