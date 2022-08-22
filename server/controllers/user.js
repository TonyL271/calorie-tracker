const UserModel = require('../models/user');

module.exports.login = (req, res, next) => {
    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        data: req.body.data
    });
    user.login()
        .then((response) => {
            console.log(response.message);
            res.send(response);
        })
        .catch(err => {
            console.log(err.message);
            res.send(err);
        })
}


module.exports.register = (req, res, next) => {
    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        data: req.body.data
    });
    user.register()
        .then((response) => {
            res.send(response);
        })
        .catch(err => {
            res.send(err);
        })
}