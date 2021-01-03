const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const binRouter = require('./bin');
const warningRouter = require('./warning');
const routeRouter = require('./route');

router.use('/auth', authRouter);
router.use('/bin', binRouter);
router.use('/warning', warningRouter);
router.use('/route', routeRouter);

module.exports = router;
