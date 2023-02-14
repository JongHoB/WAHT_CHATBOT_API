const appDataSource = require('./dataSource');
const log = require('../config/logger');

const getEventList = async (projectName, timestamp) => {
  try {
    return await appDataSource.query(
      `
    SELECT   
        u.name as host_name,
        e.id as event_id,
        e.name as event_name,
        e.start_date_time as start_time,
        e.end_date_time as end_time
        FROM
        Event e
    INNER JOIN
        User u
    ON
        e.host_wallet_address = u.wallet_address
    WHERE
        ? < e.start_date_time AND nft_project_name = ?
    `,
      [timestamp, projectName]
    );
  } catch (err) {
    log.error(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getEventDetail = async (eventName) => {
  try {
    return await appDataSource.query(
      `
    SELECT 
        e.name as event_name,
        u.name as host_name,
        e.place,
        e.description,
        e.custom_info,
        e.start_date_time as start_time,
        e.end_date_time as end_time
    FROM
        Event e
    INNER JOIN
        User u
    ON
        e.host_wallet_address = u.wallet_address
    WHERE
        e.id = ?`,
      [eventName]
    );
  } catch (err) {
    log.error(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getEventList,
  getEventDetail,
};
