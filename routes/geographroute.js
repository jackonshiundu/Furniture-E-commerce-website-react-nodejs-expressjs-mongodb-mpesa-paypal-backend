const express = require('express');
const { geographyLocation } = require('../controllers/geography');
const router = express.Router();

router.get('/getgeography', geographyLocation);

module.exports = router;
