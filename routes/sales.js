const express = require('express');
const { getOverallStats } = require('../controllers/overallStats');
const router = express.Router();

router.get('/getoverallstats', getOverallStats);

module.exports = router;
