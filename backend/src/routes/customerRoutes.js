const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomersByOrgId,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.post(
  '/customers',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  createCustomer
);
router.get(
  '/customers',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getAllCustomersByOrgId
);
router.get(
  '/customers/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getCustomerById
);
router.put(
  '/customers/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  updateCustomer
);
router.delete(
  '/customers/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager'),
  deleteCustomer
);

module.exports = router;
