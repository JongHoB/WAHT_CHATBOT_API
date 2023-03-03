const appDataSource = require('../../models/dataSource');

const createDiscordNFTs = (discordNFTList) => {
  const discordNFTData = [];

  for (const discordNFT of discordNFTList) {
    discordNFTData.push([
      discordNFT.id,
      discordNFT.user_wallet_address,
      discordNFT.smart_contract_address,
      discordNFT.token_id,
    ]);

    return appDataSource.query(
      `
        INSERT INTO Discord_User 
          (
            discord_id,
            wallet_address
          )
        VALUES ? 
      `,
      [discordNFTData]
    );
  }
};

module.exports = { createDiscordNFTs };
