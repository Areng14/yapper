const { getUserDetailById, getAllUsers } = require('../controller/auth_controller')
const passport = require('../middleware/passportConfig')
const router = require('express').Router()

router.use((req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({success: false, data: "Auth Fail"})
        }
        req.user = user;
        next();
    })(req, res, next)
})

router.get("/get/:id", (req,res) => {
    const userId = req.params.id
    getUserDetailById(userId, res)
})

router.get("/getallusers", (req,res) => {
    getAllUsers(req, res)
})

module.exports = router