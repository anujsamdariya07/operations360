const Item = require('../models/item.model.js');

const generateItemId = async (orgId) => {
  const itemCount = await Item.countDocuments({ orgId });
  const newItemId = `Item-${itemCount + 1}`;
  return newItemId;
};

module.exports = generateItemId;
