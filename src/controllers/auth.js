const User = require("../models/user");

module.exports.login = async function (req, res, next) {
    let user;
    try {
        user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(400).json({ 'message': 'User does not exist!' });
        }
        const valid = await user.isValidPassword(req.body.password);
        if (!valid) {
            return res.status(400).json({ 'message': 'Incorrect password!' });
        }
        return res.status(200).json({ 'token': user.generateJwt() });
    }
    catch (err) {
        next(err);
    }
};

module.exports.register = async function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400)
            .json({ 'message': 'Required fields!' });
    }
    try {
        if (await User.exists({ username: req.body.username })) {
            return res.status(400).json({ 'message': 'Email already exists!' });
        }
        const user = new User({ username: req.body.username, role: req.body.role });
        const passwordPlain = req.body.password;
        await user.setPassword(passwordPlain);
        await user.save();
        return res.send(user);
    }
    catch (err) {
        next(err);
    }
};
