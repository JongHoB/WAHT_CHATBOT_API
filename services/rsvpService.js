const rsvpDao = require('../models/rsvpDao');

const getQrCode = async (discordId, eventId) => {
  return await rsvpDao.getQrCode(discordId, eventId);
};
const postRsvp = async (discordId, eventId) => {
  try {
    return await rsvpDao.postRsvp(discordId, eventId);
  } catch (err) {
    throw err;
  }
};

const deleteRsvp = async (discordId, eventId) => {
  return await rsvpDao.deleteRsvp(discordId, eventId);
};

module.exports = {
  postRsvp,
  getQrCode,
  deleteRsvp,
};
