const express = require('express');
const { updateOrganization, getOrganization, deleteOrganization } = require('../controllers/organizationController');

const router = express.Router();

router.put('/update-profile/:id', updateOrganization);

router.get('/view-profile/:id', getOrganization);

router.get('/delete-profile/:id', deleteOrganization);

module.exports = router;
