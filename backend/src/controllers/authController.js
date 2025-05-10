const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/organization.model');
const Employee = require('../models/employee.model');
const sendWelcomeEmail = require('../utils/sendWelcomeEmail');
const createToken = require('../utils/createToken');
const generateEmployeeId = require('../utils/generateEmployeeId');

const signUp = async (req, res) => {
  try {
    const { name, mobileNo, email, password, gstNo, address } = req.body;

    if (!name || !mobileNo || !email || !password || !gstNo || !address) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields.' });
    }

    const existingOrg = await Organization.findOne({
      $or: [{ email }, { gstNo }],
    });
    if (existingOrg) {
      return res.status(409).json({
        message: 'Organization with this Email or GST No already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOrganization = await Organization.create({
      name,
      mobileNo,
      email,
      password: hashedPassword,
      gstNo,
      address,
      role: 'admin',
    });

    let username = email.split('@')[0];

    let existingEmployee = await Employee.findOne({ username });

    while (existingEmployee) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      username = `${email.split('@')[0]}${randomNum}`;
      existingEmployee = await Employee.findOne({ username });
    }

    const employeeId = await generateEmployeeId(newOrganization._id.toString());

    const adminEmployee = await Employee.create({
      orgId: newOrganization._id.toString(),
      id: employeeId,
      name,
      username,
      password: hashedPassword,
      mustChangePassword: false,
      role: 'admin',
      mobileNo,
      address,
    });

    newOrganization.employeeDetails.push(adminEmployee._id);
    await newOrganization.save();

    await sendWelcomeEmail({ to: email, name });

    return res.status(201).json({
      message: 'Organization and admin employee created successfully.',
    });
  } catch (error) {
    console.error('SignUp Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });
    }

    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const organization = await Organization.findById(employee.orgId);

    // If mustChangePassword is true, redirect them to password change
    if (employee.mustChangePassword) {
      return res.status(403).json({
        message: 'Password change required.',
        redirectToChangePassword: true,
        employeeId: employee._id,
      });
    }

    const token = createToken(employee);

    return res.status(200).json({
      message: 'Login successful!',
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        username: employee.username,
        role: employee.role,
      },
      organization: {
        id: organization._id,
        name: organization.name,
        gstNo: organization.gstNo,
        mobileNo: organization.mobileNo,
        address: organization.address,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const check = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth controller!', error.message);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = {
  signUp,
  signIn,
  check,
};
