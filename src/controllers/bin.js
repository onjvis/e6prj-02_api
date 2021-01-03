const Bin = require('../models/bin');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

module.exports.getBin = async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params.binId) || !await Bin.exists({ _id: req.params.binId})) {
            return res.status(404).json({ 'message': 'Bin not found!' });
        }
        const bin = await Bin.findById(req.params.binId);
        res.send(bin);
    } catch (err) {
        next(err);
    }
};

module.exports.updateBin = async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params.binId) || !await Bin.exists({ _id: req.params.binId})) {
            return res.status(404).json({ 'message': 'Bin not found!' });
        }
        const bin = await Bin.findById(req.params.binId);
        // Update bin with battery and fullness readings
        bin.battery = req.body.battery;
        bin.fullness = req.body.fullness;
        await bin.save();
        res.send(bin);
    } catch (err) {
        next(err);
    }
};

module.exports.getAllBins = async function(req, res, next) {
    try {
        const bins = await Bin.find({});
        res.send(bins);
    } catch (err) {
        next(err);
    }
};

module.exports.createBin = async function(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (jwt.decode(token).role !== token) {
        return res.status(401).json({ 'message': 'You need to be an admin to create bins!' });
    }
    if (!req.body.location.latitude || !req.body.location.longitude || !req.body.battery || !req.body.fullness)  {
        return res.status(400).json({ 'message': 'Bin needs the following parameters: latitude, longitude, battery, ' +
                'fullness!' });
    } else {
        try {
            const bin = new Bin({ location: { latitude: req.body.location.latitude,
                    longitude: req.body.location.longitude }, battery: req.body.battery, fullness: req.body.fullness });
            await bin.save();
            res.send(bin);
        } catch (err) {
            return next(err);
        }
    }
};
