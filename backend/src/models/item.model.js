const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const updateHistorySchema = new Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    quantityUpdated: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const itemSchema = new Schema(
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
    quantity: {
      type: Number,
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
      default: 10,
    },
    lastDateOfUpdate: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6ZeL1Ntu-zwEcgRli39ynixVj9yeQtfjAw&s',
    },
    updateHistory: {
      type: [updateHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Item = models.Item || model('Item', itemSchema);

module.exports = Item;
