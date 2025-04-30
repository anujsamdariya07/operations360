const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Employee', 
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'Employee', 
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
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'system'],
      default: 'text',
    },
    attachmentUrl: {
      type: String, 
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
