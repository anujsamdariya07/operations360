const Order = require('../models/order.model.js');

const generateOrderId = async (orgId) => {
  const orders = await Order.find({ orgId });

  const ids = orders
    .map((order) => {
      const match = order.id.match(/^Order-(\d+)$/);
      return match ? parseInt(match[1]) : null;
    })
    .filter((num) => num !== null);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return `Order-${maxId + 1}`;
};

module.exports = generateOrderId;
