const express = require('express');
const {
  updateOrganization,
  getOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.put('/update-profile/:id', isAuthenticated, updateOrganization);

router.get('/view-profile/:id', isAuthenticated, getOrganization);

router.get('/delete-profile/:id', isAuthenticated, deleteOrganization);

module.exports = router;
