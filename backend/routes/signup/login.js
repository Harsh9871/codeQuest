const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codeQuest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection error:', err));

// Import User model
const User = require('../../Modules/users');

router.get('/', (_req, res) => {
    res.status(400).json({ error: 'authentication error' });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received request:', req.body); // Log request data

    try {
        const users = await User.findOne({ email });
        if (!users) {
            console.log('User not found');
            return res.status(400).json({ error: 'authentication error' });
        }

        const isMatch = await bcrypt.compare(password, users.passwd);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ error: 'authentication error' });
        }

        res.json({ authToken: users.authToken });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
