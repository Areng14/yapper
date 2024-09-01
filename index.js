const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const { connect } = require("mongoose")
const { DB, PORT} = require("./config/db")
const passport = require("passport")
require("dotenv").config()

app.use('/api',require("./view/authView"))
app.use(passport.initialize())
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    return res.status(200).json({appName : "yapper"})
})

const init = async () => {
    await connect(DB)
    console.log("Connected to DB.")
}

app.listen(PORT, async () => {
    init()
    console.log(`App started on port: ${PORT}`)
})