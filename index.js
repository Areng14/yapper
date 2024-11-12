const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const { connect } = require("mongoose")
const {DB, PORT} = require("./config/db")
const passport = require("./middleware/passportConfig")
const socketIo = require("socket.io")
const http = require("http")
require("dotenv").config()

app.use(passport.initialize())
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use('/api',require("./view/authView"))
app.use('/api/user', require("./view/userView"))
app.use('/api/message', require("./view/msgView"))

app.get("/", (req, res) => {
    return res.status(200).json({appName : "yapper"})
})

const init = async () => {
    await connect(DB)
    console.log("Connected to DB.")
}

const server = http.createServer(app)
const io = socketIo(server)
app.use(express.static('public'))

io.on('connection', (stream) => {
    console.log("User connected.")

    stream.on("chatMessage", (msg) => {
        io.emit('Chat : ', msg)
    })

    stream.on("disconnect", () => {
        console.log("User disconnected.")
    })
})

app.listen(PORT, async () => {
    init()
    console.log(`App started on port: ${PORT}`)
})