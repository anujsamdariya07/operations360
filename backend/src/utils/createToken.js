const jwt = require('jsonwebtoken');


const createToken = (employee) => {
  const payload = {
    employeeId: employee._id,
    orgId: employee.orgId,
    role: employee.role,
    email: employee.email,
    name: employee.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = createToken;
