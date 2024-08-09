const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance with database connection details
const sequelize = new Sequelize('sequelize_db', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Item model
const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

// Synchronize the model with the database
const initDb = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
};

module.exports = { sequelize, Item, initDb };
