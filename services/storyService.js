const Story = require('../models/story.model');

const createStory = async (userId, content) => {
  const story = new Story({ userId, content });
  await story.save();
  return story;
};

const getStoriesByUserId = async (userId) => {
  return await Story.find({ userId }).populate('viewers', 'username');
};

const viewStory = async (storyId, userId) => {
  const story = await Story.findById(storyId);
  if (!story.viewers.includes(userId)) {
    story.viewers.push(userId);
    await story.save();
  }
  return story;
};

module.exports = {
  createStory,
  getStoriesByUserId,
  viewStory
};
