const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Item, initDb } = require('./models');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize the database
initDb().catch((err) => console.error('Error initializing database:', err));

// Create a new item
app.post('/items', async (req, res) => {
    const { name, description } = req.body;
    console.log("itmes post called",req.body)
  if (!name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  try {
    const newItem = await Item.create({ name, description });
    res.status(201).send(newItem);
  } catch (err) {
    res.status(500).send({ error: 'Database error', details: err.message });
  }
});

// Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({ error: 'Database error', details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
