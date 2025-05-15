const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const customerOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const customerSchema = new Schema(
  {
    orgId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    orders: {
      type: [customerOrderSchema],
      default: [],
    },
    gstNo: {
      type: String,
    },
    // TODO:- orders: [] -- To be added afterwards
  },
  {
    timestamps: true,
  }
);

const Customer = models.Customer || model('Customer', customerSchema);

module.exports = Customer;
