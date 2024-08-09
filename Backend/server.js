// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const sequelize = require('./config/DB');
const Task = require('./models/Task');

const app = express();
app.use(express.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Sync Sequelize models with the database
sequelize.sync().then(() => console.log('Database synced'));

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
