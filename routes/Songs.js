const express = require("express")
const router = express.Router() 

const allModels = require("../models")
const DBConn = allModels.DBConn
const Playlists = allModels.Playlists
const Songs = allModels.Songs

// Responds with all the songs in the database or all the songs on a given playlist
router.get('/', async (request, response, next) => {
    const playlistId = Number(request.query.playlistId)
    try {
        const where = {}
        if (playlistId) {
            where.playlistId = playlistId
        }
        const allSongs = await Songs.findAll({where})
        if (!allSongs || allSongs.length <= 0) {
            return response.status(404).send("No songs were found.")
        }
        return response.status(200).json(allSongs)
    } catch(error) {
        next(error)
    }
})

// Responds with a single song by its id
router.get('/:songid', async (request, response, next) => {
    const songId = Number(request.params.songid)
    try {
        const foundSong = await Songs.findByPk(songId)
        if (!foundSong) {
            return response.status(404).send("No song was found.")
        }
        return response.status(200).json(foundSong)
    } catch(error) {
        next(error)
    }
})

// Adds a song to a playlist from what sent in the body
router.post('/', async (request, response, next) => {
    const playlistId = Number(request.query.playlistId)
    try {
        const foundPlaylist = await Playlists.findByPk(playlistId)
        if (!foundPlaylist) {
            return response.status(404).send("No playlist was found.")
        }
        const newSong = await Songs.create(request.body)
        if (!newSong) {
            return response.status(404).send("Failed to add a new song.")
        }
        return response.status(201).json(newSong)
    } catch(error) {
        next(error)
    }
})

// Updates a song by its id
router.patch('/:songid', async (request, response, next) => {
    const songId = Number(request.params.songid)
    try {
        const foundSong = await Songs.findByPk(songId)
        if (!foundSong) {
            return response.status(404).send("No song was found.")
        }
        await foundSong.update(request.body)
        return response.status(200).json(foundSong)
    } catch(error) {
        next(error)
    }
})

// Deletes a song by its id
router.delete('/:songid', async (request, response, next) => {
    const songId = Number(request.params.songid)
    try {
        const foundSong = await Songs.findByPk(songId)
        if (!foundSong) {
            return response.status(404).send("No song was found.")
        }
        await foundSong.destroy()
        return response.sendStatus(204)
    } catch(error) {
        next(error)
    }
})

module.exports = router