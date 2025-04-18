const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create user
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => { // Changed this to /api/users for consistency
    try {
      const users = await User.find().lean(); // .lean() converts the Mongoose object to a plain JavaScript object
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
