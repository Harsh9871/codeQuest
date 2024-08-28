const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../Modules/users');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

router.post('/', upload.single('image'), async (req, res) => {
  const { authToken } = req.body;
  const user = await User.findOne({ authToken: authToken });
  if (!user) {
    return res.status(401).json({ message: 'Authentication error' });
  }
  if (user.catagory !== 'admin' && user.catagory !== 'teacher') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.json({ message: 'File uploaded successfully', url: imageUrl });
});

module.exports = router;