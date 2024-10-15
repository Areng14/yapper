const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const UserModel = require('../models/user')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRET_KEY
}

passport.use(
    new JwtStrategy(opts, async (jwtPayload,done) => {
        try {
            const user = await UserModel.findOne({userID: jwtPayload.id})
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        }
    })
)

module.exports = passport