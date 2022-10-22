const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbo = require('./db/calApp');


router.post('/login', async (req, res, next) => {

    const col = dbo.getDb().collection("users");
    const user = await col.findOne({ username: req.body.username });
    try {
        if (!user) {
            res.send({ success: false, message: 'User not found' });
            return;
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            res.send({ success: true, msg: 'sucessful login', user });
        } else {
            res.send({ sucess: false, msg: 'incorrect password' });
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async (req, res, next) => {
    const col = dbo.getDb().collection("users");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await col.insertOne({ username: req.body.username, password: hashedPassword, dailyMeals: [] })
        res.send({ success: true, msg: 'sucessful registration' });
    } catch (error) {
        res.send({ success: false, error, msg: 'internal server error' });
    }
});

router.patch('/addMeal', async (req, res, next) => {
    const col = dbo.getDb().collection("users");
    try {
        col.updateOne({ username: req.body.username }, { $push: { dailyMeals: req.body.dailyMeal } });
        res.send({ success: true, msg: 'meal added' });
    } catch (error) {
        res.send({ success: false, error, msg: 'internal server error' });
    }
});



module.exports = router;