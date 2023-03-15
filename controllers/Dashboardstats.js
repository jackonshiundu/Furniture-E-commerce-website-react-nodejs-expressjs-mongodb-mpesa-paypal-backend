const Overallstat = require('../models/Overallstat');
const Transaction = require('../models/Transactions');

const getDashboardStats = async (req, res, next) => {
  try {
    const currentYear = 2021;
    const currentMonth = 'November';
    const currentDay = '2021-11-15';
    const Transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
    const OverallStat = await Overallstat.find({ year: currentYear });
    const {
      yearlySalesTotal,
      totalCustomers,
      yearlyTotalSoldUnits,
      salesByCategory,
      monthlyData,
    } = Overallstat;
    const MonthlyStats = OverallStat[0].dailyData.find(({ month }) => {
      return month === currentMonth;
    });
    const todayStats = OverallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      salesByCategory,
      monthlyData,
      todayStats,
      MonthlyStats,
      Transactions,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getDashboardStats };
