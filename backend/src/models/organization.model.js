const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const orgSchema = new Schema(
  {
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gstNo: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    employeeDetails: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
      default: [],
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      default: [],
    },
    customers: {
      type: [Schema.Types.ObjectId],
      ref: 'Customer',
      default: [],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Organization = models.Organization || model('Organization', orgSchema);

module.exports = Organization;
