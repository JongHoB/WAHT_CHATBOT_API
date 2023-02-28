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

const updateDiscordUser = async (discordId) => {
  const oldNFTs = await checkDao.getOldNFTs(discordId);

  const newNFTs = await getNFTs(`${oldNFTs.walletAddress.wa}`);

  const newNFTsMap = newNFTs.ownedNfts.reduce((map, nft) => {
    const address = nft.contract.address;
    const tokenId = nft.tokenId;
    const set = map.get(address) || new Set();
    set.add(tokenId);
    map.set(address, set);
    return map;
  }, new Map());

  const oldNFTsMap = oldNFTs.oldNFTs.reduce((map, nft) => {
    const address = nft.sca;
    const tokenId = nft.ti;
    const set = map.get(address) || new Set();
    set.add(tokenId);
    map.set(address, set);
    return map;
  }, new Map());

  const difference = async (map1, map2) => {
    const result = new Map(map1);

    for (let [key, value] of map2) {
      if (result.has(key)) {
        const oldSet = result.get(key);
        for (let x of value) {
          oldSet.delete(x);
        }
        if (oldSet.size === 0) {
          result.delete(key);
        }
      }
    }

    return result;
  };
  const added = difference(newNFTsMap, oldNFTsMap);
  const removed = difference(oldNFTsMap, newNFTsMap);

  console.log('added', added);
  console.log('removed', removed);
};
