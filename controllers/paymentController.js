const express = require('express');
const axios = require('axios');
const PaymentsController = async (req, res, next) => {
  const phone = req.body.phone.substring(1);
  const amount = req.body.totalPrice;
  const date = new Date();
  const timeStamp =
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2);

  const shortCode = 174379;
  const passKey =
    'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  const password = new Buffer.from(shortCode + passKey + timeStamp).toString(
    'base64'
  );
  await axios
    .post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: 'CustomerBuyGoodsOnline',
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone}`,
        CallBackURL:
          'https://8940-2c0f-fe38-2187-dd89-4d1c-5e45-9106-77ae.in.ngrok.io/callback',
        AccountReference: `254${phone}`,
        TransactionDesc: 'Test',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log({ problem: err });
      res.status(404).json(err.message);
    });
};

module.exports = { PaymentsController };
