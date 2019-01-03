const express = require('express');

const offreController = require('../controllers/offreCasting');
const router = express.Router();

router.get('/', offreController.getOffreCastings);

module.exports = router;