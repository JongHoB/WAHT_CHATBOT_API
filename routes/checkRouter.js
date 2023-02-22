const express = require('express');
const router = express.Router();
const checkController = require('../controllers/checkController');

router.get('', checkController.checkDiscordUser);
// router.post(
//   '/smartContractAddress',
//   checkController.updateSmartContractAddress
// );
router.post('', checkController.createDiscordUser);

module.exports = router;
