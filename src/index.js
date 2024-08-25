const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const { connect } = require("mongoose")
const { DB, PORT } = require("./config/db")
require("dotenv").config()

app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    return res.status(200).json({appName : "yapper"})
})

const init = async () => {
    await connect(DB)
}

app.listen(process.env.APP_PORT, async () => {
    init()
    console.log(`App started on port: ${process.env.APP_PORT}`)
})