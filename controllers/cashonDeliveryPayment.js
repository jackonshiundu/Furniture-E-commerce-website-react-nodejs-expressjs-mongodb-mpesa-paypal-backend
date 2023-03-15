const Order = require('../models/PaymentModel');

const orderDetails = async (req, res, next) => {
  const data = req.body;
  try {
    const ordercreated = await Order.create({
      user: data.user,
      orderItems: data.orderItems.map((item) => ({
        name: item.name,
        quantity: item.Quantity,
        price: item.Price,
      })),
      shippingAddress: {
        fullName: data.shippingAddress.fullName,
        address: data.shippingAddress.address,
        city: data.shippingAddress.city,
        postalCode: data.shippingAddress.postalCode,
        county: data.shippingAddress.county,
      },
      paymentMethod: data.paymentMethod,
      phone: data.phone,
      itemsPrice: data.itemsPrice,
      shippingPrice: data.shippingPrice,
      taxPrice: data.taxPrice,
      totalPrice: data.totalPrice,
      isPaid: data.isPaid,
      paidAt: data.paidAt,
    });
    res.status(204).json({ message: 'Order Added Succesfully' });
  } catch (error) {
    console.log(error);
  }
};
const getOrders = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const orders = await Order.find({ user: id });
    if (!orders) {
      return next(createError(404, 'No Orders Yet'));
    }
    console.log(orders);
    res.status(202).json({ orders });
  } catch (error) {
    next(error);
  }
};
module.exports = { orderDetails, getOrders };
