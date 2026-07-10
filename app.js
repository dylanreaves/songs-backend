require("dotenv").config() // Technically this can be commented out.
const express = require("express")
const morgan = require("morgan")
const app = express()
const allModels = require("./models")
//const allRoutes = require("./routes")
const DBConn = allModels.DBConn || require("./db") // This can be either or
const Playlists = allModels.Playlists
const Songs = allModels.Songs

// console.log(allModels)
// console.log(Playlists)
// console.log(Songs)

const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))

// Response Status Dictionary:
//
// 200 - Get/Read and Patch/Update
// 201 - Post/Create
// 204 - Deleted (Does not respond with anything)
// 404 - Not Found
// 400 - Bad/Invalid Input
// 500 - Internal server error

// Respond with all playlists.
// If no playlists were found send a message.
app.get("/", async (request, response, next) => {
    try {
        const allLists = await Playlists.findAll()
        if (!allLists) {
            return response.status(404).send("No playlists were found.")
        }
        return response.status(200).json(allLists)
    } catch(error) {
        next(error)
    }
})

// Respond with the playlist matching the id.
// If no playlist was found send a message.
// For this route it will use the params to get the id.
// (Question: This can also be done sending a query and it might be a good idea to have support for both.
// Is a good approach to have multiple ways to get the same data or would it be a waste of time?)
// app.param()
app.get("/:id", async (request, response, next) => {
    const id = Number(request.params.id)
    try {
        const foundList = await Playlists.findByPk(id)
        if (!foundList) {
            return response.status(404).send("No playlist was found.")
        }
        return response.status(200).json(foundList)
    } catch(error) {
        next(error)
    }
})

// Create a new playlist using whats passed into the body
// Should also have a middleware function to validate the body before creating
app.post("/", async (request, response, next) => {
    try {
        const newList = await Playlists.create(request.body)
        if (!newList) {
            return response.status(400).send("Failed to create new list.")
        }
        return response.status(201).json(newList)
    } catch(error) {
        next(error)
    }
})

// Update an existing playlist using whats passed into the body
// Can also use the same middleware to check if the update will be valid 
app.patch("/:id", async (request, response, next) => {
    const id = Number(request.params.id)
    try {
        const foundList = await Playlists.findByPk(id)
        if (!foundList) {
            return response.status(400).send("No playlist was found.")
        }
        await foundList.update(request.body)
        return response.status(200).json(foundList)
    } catch(error) {
        next(error)
    }
})

// Remove an existing playlist
app.delete("/:id", async (request, response, next) => {
    const id = Number(request.params.id)
    try {
        const foundList = await Playlists.findByPk(id)
        if (!foundList) {
            return response.status(400).send("No playlist was found.")
        }
        await foundList.destroy()
        return response.sendStatus(204)
    } catch(error) {
        next(error)
    }
})

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
