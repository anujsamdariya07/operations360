const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const customerSchema = new Schema(
  {
    organization: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
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
