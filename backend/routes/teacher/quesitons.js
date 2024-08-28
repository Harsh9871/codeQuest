const express = require('express');
const router = express.Router();
const User = require('../../Modules/users');
const Question = require('../../Modules/questions');

router.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

router.post('/', async (req, res) => {
  try {
    const { authToken, imageUrl, title, description } = req.body;
    if (!authToken) {
      return res.status(400).json({ 'error': 'Authentication error' });
    }
    const user = await User.findOne({ authToken: authToken });
    if (!user) {
      return res.status(400).json({ 'error': 'Authentication error' });
    }
    if (!['admin', 'teacher'].includes(user.catagory)) {
      return res.status(400).json({ 'error': 'permition denied to create a Question' });
    }
    const newQuestion = new Question({
      image: imageUrl,
      title: title,
      description: description,
      createdAt: Date.now(),
      createdBy: user.name
    });
    await newQuestion.save();
    res.status(200).json({ 'success': 'Question created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'error': 'Internal Server Error' });
  }
});

module.exports = router;