const express = require('express');
const router = express.Router();
const {
  createVendor,
  getVendorsByOrgId,
  getVendorById
} = require('../controllers/vendorController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get(
  '/vendors',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getVendorsByOrgId
);

router.get(
  '/vendors/:id',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getVendorById
);

router.post(
  '/vendors',
  isAuthenticated,
  authorizeRoles('admin'),
  createVendor
);

module.exports = router;
