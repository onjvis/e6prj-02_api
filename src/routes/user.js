const express = require('express');
const userController = require('../controllers/user');
const jwt = require('express-jwt');

const router = express.Router();
const jwtAuth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.route('/')
    .get(jwtAuth, userController.getAllUsers);

module.exports = router;
