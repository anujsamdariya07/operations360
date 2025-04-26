const express = require('express');
const {
  updateOrganization,
  getOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');

const router = express.Router();

router.put(
  '/update-profile/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  updateOrganization
);

router.get(
  '/view-profile/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  getOrganization
);

router.delete(
  '/delete-profile/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteOrganization
);

module.exports = router;
