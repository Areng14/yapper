const { getUserDetailById, getUserList } = require('../controller/auth_controller')
const passport = require('../middleware/passportConfig')

const router = require('express').Router()

router.use((req, res,next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err){
            return next(err)
        }
        if (!user){
            return res.status(401).json({success: false, data: "Authenticated Fail"})
        }
        req.user = user;
        next();
    })(req, res,next)
})

router.get("/getUserList", (req,res) => {
    getUserList(req,res)
})

router.get("/:id", (req,res) => {
    const userId = req.params.id
    getUserDetailById(userId, res)
})

module.exports = router