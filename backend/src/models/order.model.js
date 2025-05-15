const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const orderItemSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    priceAtOrder: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    orgId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Order = models.Order || model('Order', orderSchema);

module.exports = Order;
