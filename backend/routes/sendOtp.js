const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(404).json({error:"No data"});
});

router.post('/', (req, res) => {
    
});
module.exports = router;