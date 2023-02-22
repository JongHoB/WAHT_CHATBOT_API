const appDataSource = require('./dataSource');
const log = require('../config/logger');

const getEventList = async (smartContractAddresses, timestamp) => {
  try {
    return await appDataSource.query(
      `
        SELECT
          u.name              AS host_name,
          e.id                AS event_id,
          e.name              AS event_name,
          e.start_date_time   AS start_time,
          e.end_date_time     AS end_time,
        CASE
          WHEN e.capacity = -1 THEN -1
        ELSE e.capacity - COALESCE(rsvp_count, 0)
          END                 AS spots_available
        FROM
          Event e
        INNER JOIN
          User u                
        ON 
          e.host_wallet_address = u.wallet_address
        LEFT JOIN (
          SELECT
            event_id,
            COUNT(*)           AS rsvp_count
          FROM
            RSVP
          GROUP BY
            event_id
        )                      AS rsvp
        ON
          e.id = rsvp.event_id
        WHERE
          e.start_date_time > ?
        AND e.smart_contract_address IN (?)
        AND (e.capacity = -1 OR (e.capacity - COALESCE(rsvp_count, 0)) > 0)
        ORDER BY 
          e.start_date_time
        LIMIT 25 -- Discord chatbot은 25개 이상 보여주지 못한다
      `,
      [timestamp, smartContractAddresses]
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
          e.name              AS event_name,
          u.name              AS host_name,
          e.place,
          e.images,
          e.description,
          e.custom_info,
          e.start_date_time   AS start_time,
          e.end_date_time     AS end_time
        FROM
          Event e
        INNER JOIN
          User u
        ON
          e.host_wallet_address = u.wallet_address
        WHERE
          e.id = ?
      `,
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
