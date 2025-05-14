const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const employee = await Employee.findById(decoded.id).select('-password');

    if (!employee) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Employee not found' });
    }

    req.user = {
      employeeId: employee._id,
      orgId: employee.orgId,
      role: employee.role,
      email: employee.email,
      name: employee.name,
    };

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = isAuthenticated;
