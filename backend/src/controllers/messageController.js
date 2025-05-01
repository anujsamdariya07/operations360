const Employee = require('../models/employee.model');
const Message = require('../models/message.model');

// CREATE
// const createMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, content } = req.body;
//     const orgId = req.user.orgId;
//     const message = await Message.create({
//       senderId,
//       receiverId,
//       content,
//       orgId,
//     });
//     console.log('HERE')
//     res
//       .status(201)
//       .json({ msg: 'Message has been successfully sent!', message });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const orgId = req.user.orgId;

    const message = await Message.create({
      senderId,
      receiverId,
      content,
      orgId,
    });

    // Find and update both sender and receiver by `id` (not _id)
    const sender = await Employee.findOne({ id: senderId, orgId });
    const receiver = await Employee.findOne({ id: receiverId, orgId });

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or Receiver not found' });
    }

    // Add message ID to both
    sender.messages.push(message._id);
    receiver.messages.push(message._id);

    await sender.save();
    await receiver.save();

    res.status(201).json({
      msg: 'Message has been successfully sent!',
      message,
    });
  } catch (err) {
    console.error('Message Error:', err);
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessagesReceived = async (req, res) => {
  try {
    const {employeeId} = req.params; // This assumes `req.user.id` contains the employee's id from authentication
    console.log('employeeId:', employeeId)

    // Find the employee to ensure they exist
    const employee = await Employee.findOne({ id: employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Fetch all messages where the employee is the receiver
    const messages = await Message.find({ receiverId: employeeId })
      .populate('senderId', 'name username') // Optional: populate sender details for easier reading
      .sort({ createdAt: -1 }); // Optional: sort messages by the most recent first

    // Return the messages
    return res.status(200).json({ messages });
  } catch (err) {
    console.error('Get Messages Error:', err);
    return res.status(400).json({ error: err.message });
  }
};

// UPDATE
const updateMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesReceived,
  updateMessage,
  deleteMessage,
};
