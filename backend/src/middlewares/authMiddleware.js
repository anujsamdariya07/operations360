const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log('token: ', token);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No Token Provided!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid Token Provided!' });
    }

    const employee = await Employee.findById(decoded.id).select('-password');
    console.log('employee:', employee);

    if (!employee) {
      return res.status(401).json({ message: 'Employee not found' });
    }

    req.user = employee;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protectRoute;
