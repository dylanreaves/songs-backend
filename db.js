// Simple script to create the connection to the database and export it
// This same connection will be exported for other files to use 
require('dotenv').config()
const { Sequelize } = require("sequelize")
const URL = process.env.LIVE_DB_URL || process.env.DB_URL
const DBConn = new Sequelize(URL, {logging: false})

module.exports = DBConn