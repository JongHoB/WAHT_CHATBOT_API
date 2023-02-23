const appDataSource = require('./dataSource');
const log = require('../config/logger');

const postRsvp = async (discordId, eventId) => {
  try {
    const [userWalletAddress] = await appDataSource.query(
      `
        SELECT 
            wallet_address AS wa 
        FROM 
            Discord_User 
        WHERE 
            discord_id=?;
      `,
      [discordId]
    );

    return await appDataSource.query(
      `
        INSERT INTO 
            RSVP 
            (wallet_address,event_id) 
        VALUES (?,?);`,
      [userWalletAddress.wa, eventId]
    );
  } catch (err) {
    log.error(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

// const postRsvp = async (discordId, eventId) => {
//   try {
//     const [userWalletAddress] = await appDataSource.query(
//       `
//       INSERT INTO RSVP (wallet_address,event_id) SELECT wallet_address,? FROM Discord_User WHERE discord_id=?;

//         `,
//       [eventId, discordId]
//     );
//   } catch (err) {
//     log.error(err);
//     const error = new Error('DATABASE_ERROR');
//     error.statusCode = 500;
//     throw error;
//   }
// };

module.exports = {
  postRsvp,
};
