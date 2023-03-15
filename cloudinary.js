require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload

module.exports = cloudinary;
