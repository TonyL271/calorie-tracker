const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/addMeal', userController.addMeal);

module.exports = router;