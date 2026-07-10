// Simple script to create the connection to the database and export it
// This same connection will be exported for other files to use 
require('dotenv').config()
const { Sequelize } = require("sequelize")
const DBConn = new Sequelize(process.env.DB_URL, {logging: false})

module.exports = DBConn