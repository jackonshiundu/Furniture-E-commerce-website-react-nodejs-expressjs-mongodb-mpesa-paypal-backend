const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const UserRouter = require('./routes/userRoutes');
const productsRouter = require('./routes/productroutes');
const clientsRouter = require('./routes/clients');
const transactionsRouter = require('./routes/transactions');
const geography = require('./routes/geographroute');
const OverallStats = require('./routes/sales');
const dashboardStats = require('./routes/dashboardRoutes');
const paymentRouter = require('./routes/paymentRoute');
const app = express();

require('dotenv').config();

const User = require('./models/usermodel');
const Product = require('./models/productmodel');
const ProductStat = require('./models/Productstat');
const OverallStat = require('./models/Overallstat');
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
} = require('./data/index');
const Transactions = require('./models/Transactions');
app.use(morgan('dev'));
app.use(cors());
//body parser for post requests
app.use(express.json({ limit: '30mb', extended: true }));
//body parser for  html post form
app.use(express.urlencoded({ limit: '30mb', extended: true }));
//routes
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/transactions', transactionsRouter);
app.use('/api/v1/geography', geography);
app.use('/api/v1/overallstats', OverallStats);
app.use('/api/v1/dashboard', dashboardStats);
app.use('/api/v1/payments', paymentRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went Wrong';
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

app.post('/callback', (req, res) => {
  const callbackData = req.body;
  console.log(callbackData);
  if (!callbackData.Body.stkCallback.CallbackMetadata) {
    return res.json('Request Failed please enter the Right parameters');
  }
  console.log(callbackData.Body.stkCallback);
});
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('server is listening on port 5000'.cyan.bold.underline);
    });

    //User.insertMany(dataUser).then(console.log('done'));
    //Product.insertMany(dataProduct).then(console.log('done'));
    //ProductStat.insertMany(dataProductStat).then(console.log('done'));
    // Transactions.insertMany(dataTransaction).then(console.log('done'));
    //OverallStat.insertMany(dataOverallStat).then(console.log('done'));
  })
  .catch((error) => console.log(`${error} did not Connect`));
