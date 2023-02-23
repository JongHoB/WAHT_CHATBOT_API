const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

//router.get('/list', rsvpController.getEventList);
router.post('', rsvpController.postRsvp);

module.exports = router;
