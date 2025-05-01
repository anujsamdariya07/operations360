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
const validate = require('../middlewares/validator');
const {
  employeeSchema,
  employeeUpdateSchema,
} = require('../validators/employeeValidator');

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
  validate(employeeUpdateSchema),
  createEmployee
);

router.put(
  '/employees/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  validate(employeeUpdateSchema),
  updateEmployee
);

router.delete(
  '/employees/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteEmployee
);

module.exports = router;
