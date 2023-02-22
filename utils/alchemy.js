const { Network, Alchemy } = require('alchemy-sdk');

const getNFTs = async (walletAdderss) => {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const nfts = await alchemy.nft.getNftsForOwner(`${walletAdderss}`);
  return nfts;
};

module.exports = { getNFTs };
