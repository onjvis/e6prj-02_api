const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async function(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (jwt.decode(token).role !== 'admin') {
        return res.status(401).json({ 'message': 'You need to be an admin to access user database!' });
    }
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        next(err);
    }
};
