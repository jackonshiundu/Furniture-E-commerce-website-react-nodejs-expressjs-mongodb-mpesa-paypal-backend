const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: String,
    county: String,
    country: { type: String, default: 'Kenya' },
    phoneNumber: String,
    Transaction: [String],
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  },
  {
    timeStamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
