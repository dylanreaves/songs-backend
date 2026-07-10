// This is a new implementation I'm trying: 
// from my understanding we can create an index.js file
// to get all the routes in this file and export it as an object 
// the same way we are using it for the index.js in the models folder.
const playlistRouter = require("./Playlists")
const songRouter = require("./Songs")

module.exports = {playlistRouter, songRouter}