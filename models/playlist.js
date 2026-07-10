// Defines the model for the playlists and exports into index.js
const { Sequelize, DataTypes } = require("sequelize")
const DBConn = require("../db")

const PlaylistModel = DBConn.define("Playlist", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Decided to use Text since strings are limited to 255
        allowNull: false,
    },
})

module.exports = PlaylistModel