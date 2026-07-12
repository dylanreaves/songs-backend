require("dotenv").config() // Technically this can be commented out.
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const allModels = require("./models") // object from models/index.js
const allRoutes = require("./routes") // object from routes/index.js

const DBConn = allModels.DBConn || require("./db") // This can be either or
const Playlists = allModels.Playlists
const Songs = allModels.Songs

const playlistRouter = allRoutes.playlistRouter
const songRouter = allRoutes.songRouter

// console.log(allModels)
// console.log(Playlists)
// console.log(Songs)

const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use("/api/playlists", playlistRouter)
app.use("/api/songs", songRouter)

// Response Status Dictionary:
//
// 200 - Get/Read and Patch/Update
// 201 - Post/Create
// 204 - Deleted (Does not respond with anything)
// 404 - Not Found
// 400 - Bad/Invalid Input
// 500 - Internal server error

function errorHandler(error, request, response, next) {
    console.error(error)
    next()
}
app.use(errorHandler)

async function startApp() {
    await DBConn.sync()
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
    })
}

startApp()
