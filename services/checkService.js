const checkDao = require('../models/checkDao');
const { getNFTs } = require('../utils/alchemy');

const checkDiscordUser = async (discordId) => {
  return await checkDao.checkDiscordUser(discordId);
};

const createDiscordUser = async (discordId, walletAddress) => {
  await checkDao.createDiscordUser(discordId, walletAddress);

  console.log('walletAddress', walletAddress);
  const nfts = await getNFTs('0xd1B948b9eB3D433d780b9E699f5494429e4CA51D');

  let info;
  if (nfts.totalCount) {
    info = nfts.ownedNfts.map((x) => {
      return [walletAddress, x.contract.address, x.tokenId];
    });
  }

  await checkDao.createDiscordNFT(info);

  console.log(info);

  return;
};

module.exports = { checkDiscordUser, createDiscordUser };
