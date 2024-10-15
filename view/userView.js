const { getUserDetailById } = require('../controller/auth_controller')

const router = require('express').Router()

router.get("/:id", (req,res) => {
    const userId = req.params.id
    getUserDetailById(userId, res)
})

module.exports = router