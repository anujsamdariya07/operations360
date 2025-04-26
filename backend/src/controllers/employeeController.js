const Employee = require('../models/employee.model');
const generateEmployeeId = require('../utils/generateEmployeeId');
const bcrypt = require('bcryptjs');

const getAllEmployees = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    const employees = await Employee.find({ orgId }).select('-password');

    return res.status(200).json({ employees });
  } catch (error) {
    console.error('Get All Employees Error:', error);
    return res.status(500).json({ message: 'Server Error.' });
  }
};

const getEmployee = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const { id } = req.params;

    const employee = await Employee.findOne({ orgId, id }).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    return res.status(200).json({ employee });
  } catch (error) {
    console.error('Get Employee Error:', error);
    return res.status(500).json({ message: 'Server Error.' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, username, password, role, mobileNo, address } = req.body;
    const orgId = req.user.orgId;

    if (!name || !username || !password || !role || !mobileNo || !address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUsername = await Employee.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const employeeId = await generateEmployeeId(orgId);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = await Employee.create({
      orgId,
      id: employeeId,
      name,
      username,
      password: hashedPassword,
      mustChangePassword: true,
      role,
      mobileNo,
      address,
    });

    return res.status(201).json({
      message: 'Employee created successfully.',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Create Employee Error:', error);
    return res.status(500).json({ message: 'Server Error.' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const { id } = req.params;
    const { name, role, mobileNo, address } = req.body;

    const employee = await Employee.findOne({ orgId, id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    if (name) employee.name = name;
    if (role) employee.role = role;
    if (mobileNo) employee.mobileNo = mobileNo;
    if (address) employee.address = address;

    await employee.save();

    return res
      .status(200)
      .json({ message: 'Employee updated successfully.', employee });
  } catch (error) {
    console.error('Update Employee Error:', error);
    return res.status(500).json({ message: 'Server Error.' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const { id } = req.params;

    const employee = await Employee.findOneAndDelete({ orgId, id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    console.error('Delete Employee Error:', error);
    return res.status(500).json({ message: 'Server Error.' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
