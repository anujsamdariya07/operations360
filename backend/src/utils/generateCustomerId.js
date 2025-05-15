const Customer = require('../models/customer.model.js');

const generateCustomerId = async (orgId) => {
  const customers = await Customer.find({ orgId });

  const ids = customers
    .map((customer) => {
      const match = customer.id?.match(/^Customer-(\d+)$/);
      return match ? parseInt(match[1]) : null;
    })
    .filter((num) => num !== null);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return `Customer-${maxId + 1}`;
};

module.exports = generateCustomerId;
