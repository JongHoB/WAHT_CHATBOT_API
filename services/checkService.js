const checkDao = require('../models/checkDao');
const { getNFTs } = require('../utils/alchemy');

const checkDiscordUser = async (discordId) => {
  return await checkDao.checkDiscordUser(discordId);
};

const createDiscordUser = async (discordId, walletAddress) => {
  await checkDao.createDiscordUser(discordId, walletAddress);

  const nfts = await getNFTs(walletAddress);

  let info;
  if (nfts.totalCount) {
    info = nfts.ownedNfts.map((x) => {
      return [walletAddress, x.contract.address, x.tokenId];
    });
  }

  await checkDao.createDiscordNFT(info);

  return;
};

const updateDiscordUser = async (discordId) => {
  const oldNFTs = await checkDao.getOldNFTs(discordId);
  const newNFTs = await getNFTs(`${oldNFTs.walletAddress.wa}`);

  const walletAddress = oldNFTs.walletAddress.wa;

  let newNFTsArr = newNFTs.ownedNfts.map((x) => {
    return [walletAddress, x.contract.address, x.tokenId];
  });

  let oldNFTsArr = oldNFTs.oldNFTs.map((x) => {
    return [walletAddress, x.sca, x.ti];
  });

  const addedNFTs = newNFTsArr.filter(
    (item) =>
      oldNFTsArr.findIndex((x) => x[0] === item[0] && x[1] === item[1]) === -1
  );

  const removedNFTs = oldNFTsArr.filter(
    (item) =>
      newNFTsArr.findIndex((x) => x[0] === item[0] && x[1] === item[1]) === -1
  );

  if (addedNFTs.length > 0) {
    await checkDao.insertNewDiscordNFT(addedNFTs);
  }

  if (removedNFTs.length > 0) {
    await checkDao.deleteOldDiscordNFT(removedNFTs);
  }

  return;
};

module.exports = {
  checkDiscordUser,
  createDiscordUser,
  updateDiscordUser,
};
