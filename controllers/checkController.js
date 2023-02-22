const checkService = require('../services/checkService');
const log = require('../config/logger');

const checkDiscordUser = async (req, res) => {
  try {
    const discordId = req.query.id;

    // discordId가 안 들어오면 분기 처리
    if (!discordId) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    // discordId로 Discord user check
    const check = await checkService.checkDiscordUser(discordId);

    // 등록된 user가 없으면 401 보냄
    // chatbot server에서 다시 axios
    if (!check) {
      return res.status(401).json({ message: 'Need to create user' });
    }

    return res.status(200).json({ message: 'User checked' });
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

const createDiscordUser = async (req, res) => {
  try {
    const discordId = req.query.id;
    const { walletAddress } = req.body;

    if (!discordId || !walletAddress) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    await checkService.createDiscordUser(discordId, walletAddress);

    return res.status(201).json({ message: 'Discord User Created!' });
  } catch (err) {
    log.error(err);
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  checkDiscordUser,
  createDiscordUser,
};
