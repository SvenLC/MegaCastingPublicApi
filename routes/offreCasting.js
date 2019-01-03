const express = require('express');

const offreController = require('../controllers/offreCasting');
const cache = require('../middleware/memcache');
const router = express.Router();

router.get('/', cache(100), offreController.getOffreCastings);

module.exports = router;