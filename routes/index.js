const express = require('express');
const eventRouter = require('./eventRouter');
const router = express.Router();

router.use('/events', eventRouter);

module.exports = router;
