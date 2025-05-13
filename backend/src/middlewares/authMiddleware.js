const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model'); 

const protectRoute = async (req, res, next) => {
  console.log('protectRoute-1')
  try {
    console.log('protectRoute-2')
    const token = req.cookies.jwt;
    console.log('protectRoute-3')
    console.log('token: ', token)
    
    if (!token) {
      return res
      .status(401)
      .json({ message: 'Unauthorized - No Token Provided!' });
    }
    console.log('protectRoute-4')
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('protectRoute-5')
    console.log('decoded: ', decoded)
    
    if (!decoded) {
      console.log('protectRoute-6')
      return res
      .status(401)
      .json({ message: 'Unauthorized - Invalid Token Provided!' });
    }
    console.log('protectRoute-7')
    
    const employee = await Employee.findById(decoded.id).select('-password');
    console.log('employee:', employee)
    console.log('protectRoute-8')
    
    if (!employee) {
      console.log('protectRoute-9')
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
