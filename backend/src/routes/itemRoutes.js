const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/items', isAuthenticated, getAllItems);

router.get('/items/:id', isAuthenticated, getItem);

router.post('/items', isAuthenticated, createItem);

router.put('/items/:id', isAuthenticated, updateItem);

router.delete('/items/:id', isAuthenticated, deleteItem);

module.exports = router;
