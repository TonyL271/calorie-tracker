const UserModel = require('../models/user');

module.exports.register = (req, res, next) => {
    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        data: req.body.data
    });
    user.register()
        .then(() => {
            res.send('User registered');
        })
        .catch(err => {
            res.send(err);
        })
}