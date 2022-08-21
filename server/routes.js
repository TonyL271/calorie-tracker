const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/register', userController.register);

module.exports = router;