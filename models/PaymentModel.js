const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      county: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    phone: { type: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date,  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
