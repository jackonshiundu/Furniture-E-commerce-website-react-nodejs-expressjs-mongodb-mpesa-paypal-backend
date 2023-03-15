const Overallstat = require('../models/Overallstat');
const Taansaction = require('../models/Transactions');

const getOverallStats = async (req, res, next) => {
  try {
    const overallStat = await Overallstat.find();
    res.status(200).json(overallStat[0]);
  } catch (error) {
    next(error);
  }
};
module.exports = { getOverallStats };
