require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, './dist')));
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });

app.use(express.json());
app.use('/', require('./routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
