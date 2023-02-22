const checkDao = require('../models/checkDao');
const eventDao = require('../models/eventDao');

const getEventList = async (discordId, timestamp) => {
  try {
    const getNFTs = await checkDao.getSmartContractAddresses(discordId);
    const smartContractAddresses = getNFTs.map((x) => x.sca);

    const result = await eventDao.getEventList(
      smartContractAddresses,
      timestamp
    );

    if (result.length === 0) {
      const error = new Error('NOT_FOUND');
      error.statusCode = 404;
      throw error;
    }

    return result;
  } catch (err) {
    throw err;
  }
};

const getEventDetail = async (eventId) => {
  try {
    const result = await eventDao.getEventDetail(eventId);

    if (result.length === 0) {
      const error = new Error('NOT_FOUND');
      error.statusCode = 404;
      throw error;
    }

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getEventList,
  getEventDetail,
};
