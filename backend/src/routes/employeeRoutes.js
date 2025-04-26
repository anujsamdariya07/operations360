const express = require('express');
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authorizeRoles = require('../middlewares/authorizeRoles');

const router = express.Router();

router.get(
  '/employees',
  isAuthenticated,
  authorizeRoles('admin', 'manager', 'employee'),
  getAllEmployees
);

router.get(
  '/employees/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  getEmployee
);

router.post(
  '/employees',
  isAuthenticated,
  authorizeRoles('admin'),
  createEmployee
);

router.put(
  '/employees/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  updateEmployee
);

router.delete(
  '/employees/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteEmployee
);

module.exports = router;
