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
const authorizeRoles = require('../middlewares/authorizeRoles');
const validate = require('../middlewares/validator');
const { itemSchema, itemUpdateSchema } = require('../validators/itemValidator');

router.get(
  '/items',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getAllItems
);

router.get(
  '/items/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  getItem
);

router.post(
  '/items',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  validate(itemSchema),
  createItem
);

router.put(
  '/items/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  validate(itemUpdateSchema),
  updateItem
);

router.delete(
  '/items/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  deleteItem
);

module.exports = router;
