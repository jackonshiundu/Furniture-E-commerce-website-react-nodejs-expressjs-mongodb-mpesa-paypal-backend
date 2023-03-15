const express = require('express');
const { getClient } = require('../controllers/getclients');
const router = express.Router();

router.get('/getclients', getClient);

module.exports = router;
