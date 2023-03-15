const axios = require('axios');

const generateToken = async (req, res, next) => {
  const ConsumerKey = 'sOlHcRpW0qev8vOFbC1XaBy5PyEKJQB8';
  const secretkey = 'iqDXi3xjDSA0NGtz';
  const auth = new Buffer.from(`${ConsumerKey}:${secretkey}`).toString(
    'base64'
  );

  await axios
    .get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((res) => {
      token = res.data.access_token;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err.message });
    });
};
module.exports = generateToken;
