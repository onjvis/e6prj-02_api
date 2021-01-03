const Route = require('../models/route');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

module.exports.getRoute = async function(req, res, next) {
    try {
        if (!ObjectId.isValid(req.params['routeId']) || !await Route.exists({ _id: req.params['routeId'] })) {
            return res.status(404).json({ 'message': 'Route not found!'});
        }
        const route = await Route.findById(req.params['routeId']);
        res.send(route);
    } catch (err) {
        next(err);
    }
};

module.exports.getAllRoutes = async function(req, res, next) {
    try {
        const routes = await Route.find({});
        res.send(routes);
    } catch (err) {
        next(err);
    }
};

module.exports.createRoute = async function(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (jwt.decode(token).role !== token) {
        return res.status(401).json({ 'message': 'You need to be an admin to create routes!' });
    }
    if (!req.body.bins) {
        return res.status(400).json({ 'message': 'Route needs bins object assigned to it!' });
    } else {
        try {
            const route = new Route({ bins: req.body.bins });
            if (req.body.assignee) {
                route.assignee = req.body.assignee;
            }
            await route.save();
            res.send(route);
        } catch (err) {
            return next(err);
        }
    }
};
