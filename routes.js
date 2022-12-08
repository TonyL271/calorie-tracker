const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbo = require('./db/calApp');

router.post('/login', async (req, res, next) => {
    const collection = dbo.getDb().collection("users");
    const user = await collection.findOne({ username: req.body.username });
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
    const collection = dbo.getDb().collection("users");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await collection.insertOne({ username: req.body.username, password: hashedPassword, dailyMeals: [] })
        res.send({ success: true, msg: 'sucessful registration' });
    } catch (error) {
        if (error.code === 11000) {
            res.send({ success: false, msg: 'username already exists' });
        } else {
            res.send({ success: false, error, msg: 'internal server error' });
        }
    }
});

async function handleAddMeal(req, res, next) {
    const collection = dbo.getDb().collection("users");
    try {
        console.log("req.body", req.body);
        await collection.updateOne({ username: req.body.username }, { $push: { dailyMeals: req.body.dailyMeal } });
        const user = await collection.findOne({ username: req.body.username, });
        return { success: true, user, msg: 'meal added' }
    } catch (error) {
        return { success: false, error, msg: 'internal server error' };
    }
}
async function handleDeleteMeal(req, res, next) {
    const collection = dbo.getDb().collection("users");

    try {
        const updateStatus = await collection.updateOne(
            { username: req.body.username },
            {
                "$pull":
                {
                    dailyMeals:
                    {
                        date: req.body.date
                    }
                }
            });
        const user = await collection.findOne({ username: req.body.username, });
        return ({ success: true, user, msg: 'meal added' });
    } catch (error) {
        return ({ success: false, error, msg: 'internal server error' });
    }
}

router.patch('/addMeal', (req, res, next) => {
    handleAddMeal(req, res, next).then(
        result => res.send(result)
    )
});

router.patch('/deleteMeal', (req, res, next) => {
    handleDeleteMeal(req, res, next).then(
        result => res.send(result)
    )
});


router.patch('/overwriteMeal', async (req, res, next) => {
    try {
        await handleDeleteMeal(req, res, next);
        res.send(await handleAddMeal(req, res, next));
    } catch (error) {
        res.send({ success: false, msg: 'internal server error' });
    }
});



module.exports = router;