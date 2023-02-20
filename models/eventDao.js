const appDataSource = require('./dataSource');
const log = require('../config/logger');

const getEventList = async (smartContractAddresses, timestamp) => {
  try {
    return await appDataSource.query(
      `
      SELECT   
        u.name            AS host_name,
        e.id 				      AS event_id,
        e.name 			      AS event_name,
        e.start_date_time AS start_time,
        e.end_date_time 	AS end_time
      FROM
        Event e
      INNER JOIN
        User u
      ON
        e.host_wallet_address = u.wallet_address
      WHERE start_date_time > "2020-01-01 00:00:00"
      AND smart_contract_address = "0x25e5e2b4b8f11c32cdd48c2fb394fbda9a2861f7";
    `
    );
  } catch (err) {
    log.error(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getEventDetail = async (eventId) => {
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
      [eventId]
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
