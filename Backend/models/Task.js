// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/DB');

// Define the Task model with Sequelize
const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('to-do', 'in-progress', 'finished'),
    defaultValue: 'to-do',
  },
});

module.exports = Task;
