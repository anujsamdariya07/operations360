const express = require('express');
const router = express.Router();
const {
  createVendor,
  getVendorsByOrgId,
} = require('../controllers/vendorController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');
const {
  vendorSchema,
  vendorUpdateSchema,
} = require('../validators/vendorValidator');
const validate = require('../middlewares/validator');

router.get(
  '/vendors',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getVendorsByOrgId
);

router.post(
  '/vendors',
  isAuthenticated,
  authorizeRoles('admin'),
  validate(vendorUpdateSchema),
  createVendor
);

module.exports = router;
