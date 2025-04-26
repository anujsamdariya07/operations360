const jwt = require('jsonwebtoken');

const payload = {
  employeeId: employee._id,
  orgId: employee.orgId,
  role: employee.role,
  email: employee.email,
  name: employee.name,
};

const createToken = (employeeId) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = createToken;
