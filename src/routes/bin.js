const express = require('express');
const binController = require('../controllers/bin');
const jwt = require('express-jwt');

const router = express.Router();
const jwtAuth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.route('/:binId')
    .get(binController.getBin)
    .put(jwtAuth, binController.updateBin);

router.route('/')
    .get(binController.getAllBins)
    .post(jwtAuth, binController.createBin);

module.exports = router;
