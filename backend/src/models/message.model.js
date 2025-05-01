const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const Message = models.Message || model('Message', messageSchema);

module.exports = Message;
