const User = require('../models/usermodel');

const getClient = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('-password')
      .limit(20);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

module.exports = { getClient };
