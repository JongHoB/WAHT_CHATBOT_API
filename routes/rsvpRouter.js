const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

//router.get('/list', rsvpController.getEventList);
router.get('', rsvpController.getQrCode);
router.post('', rsvpController.postRsvp);
router.delete('', rsvpController.deleteRsvp);
module.exports = router;
