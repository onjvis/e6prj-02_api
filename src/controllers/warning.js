const Warning = require('../models/warning');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

module.exports.getWarning = async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params['warningId']) ||
            !await Warning.exists({ _id: req.params['warningId'] })) {
            return res.status(404).json({ 'message': 'Warning not found!' });
        }
        const warning = await Warning.findById(req.params['warningId']);
        res.send(warning);
    } catch (err) {
        next(err);
    }
};

module.exports.getAllWarnings = async function(req, res, next) {
    try {
        const warnings = await Warning.find({});
        res.send(warnings);
    } catch (err) {
        next(err);
    }
};

module.exports.createWarning = async function(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (jwt.decode(token).role !== 'admin') {
        return res.status(401).json({ 'message': 'You need to be an admin to create warnings!' });
    }
    if (!req.body.binId || !req.body.type || !req.body.timestamp) {
        return res.status(400).json({ 'message': 'Warning needs the following parameters: binId, type, timestamp!' });
    } else {
        try {
            const warning = new Warning({ binId: req.body.binId, type: req.body.type,
                timestamp: req.body.timestamp });
            if (req.body.message) {
                warning.message = req.body.message;
            }
            await warning.save();
            res.send(warning);
        } catch (err) {
            return next(err);
        }
    }
};
