const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const employeeSchema = new Schema(
  {
    orgId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      default: 'pwd',
    },
    mustChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'admin',
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    attendance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = models.Employee || model('Employee', employeeSchema);

module.exports = Employee;
