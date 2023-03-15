const express = require('express');
const { getTransactions } = require('../controllers/getTransactions');
const router = express.Router();

router.get('/gettransaction', getTransactions);

module.exports = router;
