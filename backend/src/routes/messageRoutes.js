const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesReceived,
  updateMessage,
  deleteMessage,
} = require('../controllers/messageController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, getAllMessages);
router.get('/received/:employeeId', isAuthenticated, getMessagesReceived);
router.get('/:id', isAuthenticated, getMessageById);
router.post('/', isAuthenticated, createMessage);
router.put('/:id', isAuthenticated, updateMessage);
router.delete('/:id', isAuthenticated, deleteMessage);

module.exports = router;
