const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session");
require ('dotenv').config()

const app = express()

app.use(cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
}))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

const port = process.env.PORT

routes(app)

app.listen(port, () => console.log(`O servidor está On`))

module.exports = app