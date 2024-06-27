const express = require('express');
const router = express.Router();
const storyService = require('../services/storyService');

// Create a new story
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const story = await storyService.createStory(userId, content);
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stories by user ID
router.get('/:userId', async (req, res) => {
  try {
    const stories = await storyService.getStoriesByUserId(req.params.userId);
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View a story
router.post('/:storyId/view', async (req, res) => {
  try {
    const { userId } = req.body;
    const story = await storyService.viewStory(req.params.storyId, userId);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
