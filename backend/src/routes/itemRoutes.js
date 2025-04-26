const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

router.get('/items', getAllItems);

router.get('/items/:id', getItem);

router.post('/items', createItem);

router.put('/items/:id', updateItem);

router.delete('/items/:id', deleteItem);

module.exports = router;
