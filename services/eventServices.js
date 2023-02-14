const eventDao = require('../models/eventDao');

const getEventList = async (projectName, timestamp) => {
  try {
    const result = await eventDao.getEventList(projectName, timestamp);

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

const getEventDetail = async (eventName) => {
  try {
    const result = await eventDao.getEventDetail(eventName);

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
