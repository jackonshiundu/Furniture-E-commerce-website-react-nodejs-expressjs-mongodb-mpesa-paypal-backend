const Transactions = require('../models/Transactions');

const getTransactions = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transaction = await Transactions.find({
      $or: [
        {
          cost: { $regex: new RegExp(search, 'i') },
        },
        {
          userId: { $regex: new RegExp(search, 'i') },
        },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    const total = await Transactions.countDocuments({
      name: { $regex: search, $options: 'i' },
    });
    res.status(200).json({ total, transaction });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransactions };
