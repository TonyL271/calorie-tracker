require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const UserModel = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("connected");
    const GuestModel = new UserModel({
        username: 'guest',
        password: 'guest',
        data: []
    })
    GuestModel.register()
        .then(() => {
            console.log('guest created');
        }).catch(err => {
            console.log(err);
        });
});

if (process.env.NODE_ENV === 'production') {
    app.use('./client/build');
}

app.use(express.json());
app.use('/', require('./routes'));

app.use('/hello', (req, res) => {
    res.send('hello');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
