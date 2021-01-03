const express = require('express');
const routeController = require('../controllers/route');
const jwt = require('express-jwt');

const router = express.Router();
const jwtAuth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.route('/:routeId')
    .get(jwtAuth, routeController.getRoute);

router.route('/')
    .get(jwtAuth, routeController.getAllRoutes)
    .post(jwtAuth, routeController.createRoute);

module.exports = router;
