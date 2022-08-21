const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: {},
        default: {},
        required: true
    }
},{minimize: false});

UserSchema.methods.register = function () {
    return new Promise((resolve, reject) => {
        const userModel = mongoose.model('User', UserSchema);
        const user = new userModel({
            username: this.username,
            password: this.password,
            data: this.data
        });
        user.save()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    })
}

module.exports = mongoose.model('User', UserSchema);