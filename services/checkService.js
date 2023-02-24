const checkDao = require('../models/checkDao');
const { getNFTs } = require('../utils/alchemy');

const checkDiscordUser = async (discordId) => {
  return await checkDao.checkDiscordUser(discordId);
};

const createDiscordUser = async (discordId, walletAddress) => {
  await checkDao.createDiscordUser(discordId, walletAddress);

  console.log('walletAddress', walletAddress);
  const nfts = await getNFTs('0xd1B948b9eB3D433d780b9E699f5494429e4CA51D'); // 수정 필요
  console.log('//////////', nfts);
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

const updateDiscordUser = async (discordId) => {
  const oldNFTs = await checkDao.getOldNFTs(discordId);

  const newNFTs = await getNFTs(`${oldNFTs.walletAddress.wa}`);

  let newNFTsArr = newNFTs.ownedNfts.map((x) => {
    return [x.contract.address, x.tokenId];
  });

  let oldNFTsArr = oldNFTs.oldNFTs.map((x) => {
    return [x.sca, x.ti];
  });

  // 비교하기
};

module.exports = {
  checkDiscordUser,
  createDiscordUser,
  updateDiscordUser,
};
