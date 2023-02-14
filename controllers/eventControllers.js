const eventService = require('../services/eventServices');
const log = require('../config/logger');

const getEventList = async (req, res) => {
  try {
    const { projectName, timestamp } = req.query;

    if (!projectName || !timestamp) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    const list = await eventService.getEventList(projectName, timestamp);
    return res.status(200).json(list);
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

const getEventDetail = async (req, res) => {
  try {
    const eventName = req.query.eventName;

    if (!eventName) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    const data = await eventService.getEventDetail(eventName);

    return res.status(200).json(data);
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getEventList,
  getEventDetail,
};
