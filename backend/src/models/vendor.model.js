const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const vendorSchema = new Schema(
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
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    gstNo: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vendor = models.Vendor || model('Vendor', vendorSchema);

module.exports = Vendor;
