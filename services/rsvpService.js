const rsvpDao = require('../models/rsvpDao');

const getQrCode = async (discordId, eventId) => {
  return await rsvpDao.getQrCode(discordId, eventId);
};
const postRsvp = async (discordId, eventId) => {
  try {
    await rsvpDao.postRsvp(discordId, eventId);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  postRsvp,
  getQrCode,
};
