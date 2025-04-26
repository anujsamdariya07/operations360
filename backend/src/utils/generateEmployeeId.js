const Employee = require('../models/employee.model.js');

const generateEmployeeId = async (orgId) => {
  const employees = await Employee.find({ orgId });

  const ids = employees
    .map((e) => {
      const match = e.id.match(/^Employee-(\d+)$/);
      return match ? parseInt(match[1]) : null;
    })
    .filter((num) => num !== null);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return `Employee-${maxId + 1}`;
};

module.exports = generateEmployeeId;
