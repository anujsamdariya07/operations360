const express = require('express');
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.get('/employees', isAuthenticated, getAllEmployees);

router.get('/employees/:id', isAuthenticated, getEmployee);

router.post('/employees', isAuthenticated, createEmployee);

router.put('/employees/:id', isAuthenticated, updateEmployee);

router.delete('/employees/:id', isAuthenticated, deleteEmployee);

module.exports = router;
