// Defines the model for the songs and exports into index.js
const { Sequelize, DataTypes } = require("sequelize")
const DBConn = require("../db")

const SongModel = DBConn.define("Song", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // Time in seconds
        allowNull: false,
    },
})

module.exports = SongModel