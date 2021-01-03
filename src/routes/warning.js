const express = require('express');
const warningController = require('../controllers/warning');
const jwt = require('express-jwt');

const router = express.Router();
const jwtAuth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.route('/:warningId')
    .get(jwtAuth, warningController.getWarning);

router.route('/')
    .get(jwtAuth, warningController.getAllWarnings)
    .post(jwtAuth, warningController.createWarning);

module.exports = router;
