const express = require('express');
const { getDashboardStats } = require('../controllers/Dashboardstats');
const router = express.Router();

router.get('/dashboarstats', getDashboardStats);

module.exports = router;
