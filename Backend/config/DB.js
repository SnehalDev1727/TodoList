// config/database.js
const { Sequelize } = require('sequelize');

// Set up Sequelize to connect to the MySQL database
const sequelize = new Sequelize('todolist', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
