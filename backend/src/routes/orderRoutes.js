const express = require('express');
const router = express.Router();
const {
  getAllOrdersByOrgId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.post(
  '/orders',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  createOrder
);

router.get(
  '/orders',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getAllOrdersByOrgId
);

router.get(
  '/orders/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getOrderById
);

router.put(
  '/orders/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  updateOrder
);

router.delete(
  '/orders/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  deleteOrder
);

module.exports = router;
