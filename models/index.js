// Handles models and exports them as a single object
// Also defines any required associations between models
const DBConn = require("../db")
const Playlists = require("./playlist")
const Songs = require("./song")

Playlists.hasMany(Songs, {
    foreignKey: "playlistId",
    onDelete: "CASCADE",
    hooks: true,
})
Songs.belongsTo(Playlists, {
    foreignKey: "playlistId"
})

module.exports = {DBConn, Playlists, Songs}