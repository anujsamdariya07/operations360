const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const customerSchema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
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
    employeeDetails: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
      default: [],
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = models.Customer || model('Customer', customerSchema);

module.exports = Customer;
