const rsvpService = require('../services/rsvpService');
const log = require('../config/logger');

const getQrCode = async (req, res) => {
  try {
    const discordId = req.query.id;
    const { eventId } = req.query;
    console.log(discordId, eventId);

    if (!discordId || !eventId) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    const data = await rsvpService.getQrCode(discordId, eventId);

    return res.status(200).json({ qrKey: data });
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

const postRsvp = async (req, res) => {
  try {
    const discordId = req.query.id;
    const { eventId } = req.query;
    if (!discordId || !eventId) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    console.log(discordId, eventId);
    await rsvpService.postRsvp(discordId, eventId);

    return res.status(200).json({ message: 'posted' });
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = { postRsvp, getQrCode };
