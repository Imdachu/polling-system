const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');

// Create a new poll
router.post('/create', async (req, res) => {
  try {
    const { question, options } = req.body; 
    if (!question || options.length < 2) {
      return res.status(400).json({ error: 'Invalid poll data' });
    }
    const poll = new Poll({ question, options });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Render poll page
router.get('/view/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.render('poll', { poll });
  } catch (err) {
    res.status(500).send('Error loading poll');
  }
});

// Get a poll by ID
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;